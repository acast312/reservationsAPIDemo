import { injectable } from "inversify";
import { IReservation, IRestaurant, Restaurant } from "../../models/schemas/ReservationSchemas";
import { IRestaurantProvider } from "../../models/IRestaurantProvider";

@injectable()
export class RestaurantProvider implements IRestaurantProvider {
    
    async getAll(): Promise<IRestaurant[]> {
        const restaurants = await Restaurant.find()
        return restaurants
    }

}
