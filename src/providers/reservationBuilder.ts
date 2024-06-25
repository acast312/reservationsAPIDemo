import { inject, injectable } from "inversify";
import { IReservationBuilder } from "../models/IReservationBuilder";
import { IEaterProvider } from "../models/IEaterProvider";
import { IRestaurantProvider } from "../models/IRestaurantProvider";
import { TYPES } from "../models/types";
import { IReservationProvider } from "../models/IReservationProvider";
import { IEater, IReservation, IRestaurant, Reservation, Restaurant } from "../models/schemas/ReservationSchemas";
import { FilterQuery } from "mongoose";
import { ITableOccupancy } from "../models/ITableOccupancy";

@injectable()
export class ReservationBuilder implements IReservationBuilder {
    private _eaterProvider: IEaterProvider;
    private _restaurantProvider: IRestaurantProvider;
    private _reservationProvider: IReservationProvider;

    constructor(
        @inject(TYPES.IEaterProvider) eaterProvider: IEaterProvider,
        @inject(TYPES.IRestaurantProvider) restaurantProvider: IRestaurantProvider,
        @inject(TYPES.IReservationProvider) reservationProvider: IReservationProvider
    ) {
        this._eaterProvider = eaterProvider;
        this._restaurantProvider = restaurantProvider;
        this._reservationProvider = reservationProvider;
    }

    getTable = (numEaters: number, restaurant: IRestaurant): string=> {
        if(numEaters > 6) {
            throw new Error("Error matching tables");
        }
        if(numEaters <= 2) {
            if(restaurant.twoTop > 0) return "twoTop"
            else if(restaurant.fourTop > 0) return "fourTop"
            else if(restaurant.sixTop > 0) return "sixTop"
        }
        
        if(numEaters <= 4) {
            if(restaurant.fourTop > 0) return "fourTop"
            else if(restaurant.sixTop > 0) return "sixTop"
        }

        else {
            if(restaurant.sixTop > 0) return "sixTop"
        }

        throw new Error("Error matching tables")
    }

    buildReservation = (time: Date, eaters: string[], restaurant: IRestaurant): IReservation => {
        const endTime = new Date(time)
        endTime.setHours(endTime.getHours() + 2)
        
        const newReservation: IReservation = {
            startTime: time,
            endTime: endTime,
            eaters: eaters,
            numEaters: eaters.length,
            restaurant: restaurant.name,
            table: this.getTable(eaters.length, restaurant)
        };

        return newReservation;
    }
    
    createReservation = async (time: Date, eaters: string[], restaurantName: string): Promise<IReservation> => {
        const endTime = new Date(time)
        endTime.setHours(endTime.getHours() + 2)

        // Check if any of our users have an overlapping reservation
        const overlappingReservations = await Reservation.find({
            eaters: {$in: eaters},
            startTime: {$lte: time},
            endTime: {$gte: endTime} 
        })

        if(overlappingReservations.length > 0) { 
            throw new Error("Overlapping reservation")
        } 
        
        
        const existingReservations: IReservation[] = await Reservation.find({
            restaurant: restaurantName,
            endTime: {$lte: endTime},
        })


        const occupancyAtTime = this.buildRestaurantOccupancy(existingReservations)

        const restaurant: IRestaurant | null = await Restaurant.findOne({
            name: restaurantName
        })

        if(!restaurant) { 
            throw new Error("Restaurant does not exist");
    
        }

        // apply occupancy to availability
        restaurant.twoTop -= occupancyAtTime.twoTop;
        restaurant.fourTop -= occupancyAtTime.fourTop;
        restaurant.sixTop -= occupancyAtTime.sixTop;


        const reservation = new Reservation(this.buildReservation(time, eaters, restaurant))
        try {
            await reservation.save()
        
        } catch (err) {
            throw new Error("Cannot save reservation")
        }
        return reservation
    }

    getAvailableRestaurantsNames = async(time: Date, eaters: string[]): Promise<string[]> => {
        const filteredRestaurants = await this.getAvailableRestaurants(time, eaters);
        const names = filteredRestaurants.reduce((restaurantNames: string[], restaurant) => {
            return [...restaurantNames, restaurant.name]
        },[])


        return names
    }

    getAvailableRestaurants = async (time: Date, eaters: string[]): Promise<IRestaurant[]> => {
        const endTime = new Date(time)
        endTime.setHours(endTime.getHours() + 2)
        
        const knownEaters = await this._eaterProvider.getEatersById(eaters)
        
        // Check if any of our users have an overlapping reservation
        const overlappingReservations = await Reservation.find({
            eaters: {$in: eaters},
            startTime: {$lte: time},
            endTime: {$gte: endTime} 
        })


        console.log(overlappingReservations)
        if(overlappingReservations.length > 0) { return []} // return empty list of available restaurants
        
        const diateryRestrictions = knownEaters.reduce((restrictions: string[], eater) => {
            restrictions = [...restrictions, ...eater.dietaryRestrictions]
            return restrictions
        }, [])
        
        const restaurants: IRestaurant[] = await Restaurant.find(this.buildRestaurantFilter(diateryRestrictions))

        const filteredRestaurants = await restaurants.filter( async restaurant => {
            
            const reservations: IReservation[] = await Reservation.find({
                restaurant: restaurant.name,
                startTime: {$lt: endTime},
            });

            const occupancy = this.buildRestaurantOccupancy(reservations);

            const patrons = knownEaters.length
            if(patrons <= 2) {
                return restaurant.twoTop > occupancy.twoTop || restaurant.fourTop > occupancy.fourTop || restaurant.sixTop > occupancy.sixTop 
            } else if ( patrons <= 4 ) {
                return restaurant.fourTop > occupancy.fourTop || restaurant.sixTop > occupancy.sixTop 
            } else {
                return restaurant.sixTop > occupancy.sixTop
            }
        })

        return filteredRestaurants
        
    }


    buildRestaurantFilter = (diateryRestrictions: string[]): FilterQuery<IRestaurant> => {
        const query: FilterQuery<IRestaurant> = {}
        if(diateryRestrictions.length > 0) {
            query.endorsements = {
                $all: diateryRestrictions
            }
        }
        return query
    }

    buildRestaurantOccupancy = (reservations: IReservation[]): ITableOccupancy => {
        const occupancy: ITableOccupancy = {
            twoTop: 0,
            fourTop: 0,
            sixTop: 0
        }

        reservations.forEach( reservation => {
            occupancy[reservation.table as keyof ITableOccupancy] += 1

        })
        return occupancy
    };

}
