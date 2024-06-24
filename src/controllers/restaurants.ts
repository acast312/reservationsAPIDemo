import { NextFunction, Request, Response } from "express";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { IRestaurantProvider } from "../models/IRestaurantProvider";
import { inject } from "inversify";
import { TYPES } from "../models/types";

@controller("/restaurants")
export class RestaurantController implements interfaces.Controller {
    private _restaurantProvider: IRestaurantProvider;

    constructor(
        @inject(TYPES.IRestaurantProvider) restaurantProvider: IRestaurantProvider
    ){
        this._restaurantProvider = restaurantProvider
    }

    @httpGet("/")
    public async getAll(req: Request, res: Response, next: NextFunction) {
        return res.json(await this._restaurantProvider.getAll())
    }

}