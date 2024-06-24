import {Eater, IEater} from "./schemas/ReservationSchemas"

export interface IEaterProvider {
    getAll(): Promise<IEater[]>
}