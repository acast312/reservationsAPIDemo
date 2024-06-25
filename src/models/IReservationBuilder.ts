import { ITableOccupancy } from "../providers/reservationBuilder";
import { IReservation, IRestaurant } from "./schemas/ReservationSchemas";

export interface IReservationBuilder {

    getAvailableRestaurants(time: Date, eaters: string[]): Promise<IRestaurant[]>
    getAvailableRestaurantsNames(time: Date, eaters: string[]): Promise<string[]>
    createReservation(time: Date, eaters: string[], restaurantName: string): Promise<IReservation>
    buildReservation(time: Date, eaters: string[], restaurant: IRestaurant): IReservation
    getTable(numEaters: number, restaurant: IRestaurant): string
    buildRestaurantOccupancy(reservations: IReservation[]): ITableOccupancy
}