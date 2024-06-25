import { IReservation, IRestaurant } from "./schemas/ReservationSchemas";

export interface IReservationBuilder {

    getAvailableRestaurants(time: Date, eaters: string[]): Promise<IRestaurant[]>
    getAvailableRestaurantsNames(time: Date, eaters: string[]): Promise<string[]>
    createReservation(time: Date, eaters: string[], restaurantName: string): Promise<IReservation>
    buildReservation(time: Date, eaters: string[], restaurant: IRestaurant): IReservation
}