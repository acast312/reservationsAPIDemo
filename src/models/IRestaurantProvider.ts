import { IRestaurant } from "./schemas/ReservationSchemas";

export interface IRestaurantProvider {
    getAll(): Promise<IRestaurant[]>
}