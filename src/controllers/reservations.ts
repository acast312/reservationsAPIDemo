import { NextFunction, Request, Response } from "express";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { IReservationProvider } from "../models/IReservationProvider";
import { inject } from "inversify";
import { TYPES } from "../models/types";

@controller("/reservations")
export class ReservationsController implements interfaces.Controller {
    private _reservationProvider: IReservationProvider

    constructor(
        @inject(TYPES.IReservationProvider) reservationProvider: IReservationProvider
    ){
        this._reservationProvider = reservationProvider;
    }

    @httpGet("/")
    public async getAll(req: Request, res: Response, next: NextFunction) {
        return res.json(await this._reservationProvider.getAll())
    }

}