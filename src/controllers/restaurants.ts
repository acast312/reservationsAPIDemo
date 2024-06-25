import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost, interfaces } from "inversify-express-utils";
import { IRestaurantProvider } from "../models/IRestaurantProvider";
import { inject } from "inversify";
import { TYPES } from "../models/types";
import { IReservationBuilder } from "../models/IReservationBuilder";
import { IRestaurantSearchRequest } from "../models/Requests";

@controller("/restaurants")
export class RestaurantController implements interfaces.Controller {
    private _restaurantProvider: IRestaurantProvider;
    private _reservationBuilder: IReservationBuilder;

    constructor(
        @inject(TYPES.IRestaurantProvider) restaurantProvider: IRestaurantProvider,
        @inject(TYPES.IReservationBuilder) reservationBuider: IReservationBuilder
    ){
        this._restaurantProvider = restaurantProvider;
        this._reservationBuilder = reservationBuider;
    }

    @httpGet("/")
    public async getAll(req: Request, res: Response, next: NextFunction) {
        return res.json(await this._restaurantProvider.getAll())
    }

    @httpPost("/")
    public async getRestaurant(req: Request, res: Response, next: NextFunction) {
        const data: IRestaurantSearchRequest = req.body
        console.log(data)
        return res.json(await this._reservationBuilder.getAvailableRestaurants(data.time, data.eaters))
    }

}