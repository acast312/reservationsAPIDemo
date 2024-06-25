import { IRestaurant } from "./schemas/ReservationSchemas";

export interface IRestaurantProvider {
    getAll(): Promise<IRestaurant[]>

    getRestaurantForGroup(dietaryRestrictions: string[], numEaters: number): Promise<IRestaurant[]>
}