import { NextFunction, Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPost, interfaces, requestParam } from "inversify-express-utils";
import { IReservationProvider } from "../models/IReservationProvider";
import { inject } from "inversify";
import { TYPES } from "../models/types";
import { IReservationCreateRequest } from "../models/Requests";
import { IReservationBuilder } from "../models/IReservationBuilder";
import { Reservation } from "../models/schemas/ReservationSchemas";

@controller("/reservations")
export class ReservationsController implements interfaces.Controller {
    private _reservationProvider: IReservationProvider
    private _reservationBuilder: IReservationBuilder;

    constructor(
        @inject(TYPES.IReservationProvider) reservationProvider: IReservationProvider,
        @inject(TYPES.IReservationBuilder) reservationBuider: IReservationBuilder
    ){
        this._reservationProvider = reservationProvider;
        this._reservationBuilder = reservationBuider;
    }

    @httpGet("/")
    async getAll(req: Request, res: Response, next: NextFunction) {
        return res.json(await this._reservationProvider.getAll())
    }

    @httpPost("/create")
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: IReservationCreateRequest = req.body;

            return res.json(await this._reservationBuilder.createReservation(data.time, data.eaters, data.restaurant))
        } catch (err) {
            return res.status(500).json(`${err}`)
        }
        
    }

    @httpDelete("/:id")
    async delete(@requestParam("id") id: string, req: Request, res: Response, next: NextFunction) {
        
        const reservation = Reservation.findById(id)
        
        try {
            await reservation.deleteOne()
            return res.sendStatus(200)
        } catch (err) {
            return res.status(500).json(`${err}`)
        }
        
    }

}