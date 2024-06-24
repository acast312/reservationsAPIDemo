import { inject, injectable } from "inversify";
import { IReservationBuilder } from "../models/IReservationBuilder";
import { IEaterProvider } from "../models/IEaterProvider";
import { IRestaurantProvider } from "../models/IRestaurantProvider";
import { TYPES } from "../models/types";
import { IReservationProvider } from "../models/IReservationProvider";

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
        console.log(knownEaters)

        return new Promise(() => [])
    }


}
