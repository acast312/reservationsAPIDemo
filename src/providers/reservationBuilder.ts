import { inject, injectable } from "inversify";
import { IReservationBuilder } from "../models/IReservationBuilder";
import { IEaterProvider } from "../models/IEaterProvider";
import { IRestaurantProvider } from "../models/IRestaurantProvider";
import { TYPES } from "../models/types";
import { IReservationProvider } from "../models/IReservationProvider";
import { IEater, IRestaurant, Restaurant } from "../models/schemas/ReservationSchemas";
import { FilterQuery } from "mongoose";
import { query } from "express";

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

    async getAvailableRestaurants(time: Date, eaters: string[]): Promise<String[]> {
        const knownEaters = await this._eaterProvider.getEatersByName(eaters)
        const diateryRestrictions = knownEaters.reduce((restrictions: string[], eater) => {
            restrictions = [...restrictions, ...eater.dietaryRestrictions]
            return restrictions
        }, [])

        console.log(diateryRestrictions)
        
        const restaurants: IRestaurant[] = await Restaurant.find(this.buildRestaurantFilter(diateryRestrictions))
        console.log(restaurants)
        const filteredRestaurants = restaurants.filter( restaurant => {
            const patrons = knownEaters.length
            if(patrons <= 2) {
                return restaurant.twoTop > 0 || restaurant.fourTop > 0 || restaurant.sixTop > 0 
            } else if ( patrons <= 4 ) {
                return restaurant.fourTop > 0 || restaurant.sixTop > 0 
            } else {
                return restaurant.sixTop > 0 
            }
        })
        
        const names = filteredRestaurants.reduce((restaurantNames: string[], restaurant) => {
            return [...restaurantNames, restaurant.name]
        },[])

        return names
    }


    buildRestaurantFilter(diateryRestrictions: string[]): FilterQuery<IRestaurant> {
        const query: FilterQuery<IRestaurant> = {}
        if(diateryRestrictions.length > 0) {
            query.endorsements = {
                $all: diateryRestrictions
            }
        }
        console.log(query)
        return query
    }

}
