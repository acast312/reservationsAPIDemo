import { inject, injectable } from "inversify";
import { IEaterProvider } from "../models/IEaterProvider";
import { DbService } from "../services/DBService";
import { TYPES } from "../models/types";
import { Eater, IEater } from "../models/schemas/ReservationSchemas";


@injectable()
export class EaterProvider implements IEaterProvider {

    private _dbService: DbService;
    constructor(
        @inject(TYPES.DbService) dbService: DbService
    ) {
        this._dbService = dbService;
    }


    async getAll(): Promise<IEater[]> {
        const eaters = await Eater.find()
        return eaters
    }

}
