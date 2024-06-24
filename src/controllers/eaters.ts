import { NextFunction, Request, Response } from "express";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { IEaterProvider } from "../models/IEaterProvider";
import { inject } from "inversify";
import { TYPES } from "../models/types";

@controller('/eaters')
export class EaterController implements interfaces.Controller {
    private _eaterProvider: IEaterProvider;

    constructor(
        @inject(TYPES.IEaterProvider) eaterProvider: IEaterProvider 
    ){
        this._eaterProvider = eaterProvider;
    }

    @httpGet("/")
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const eaters = await this._eaterProvider.getAll()
        return res.json(eaters)
    }
}