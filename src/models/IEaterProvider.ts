import {Eater, IEater} from "./schemas/ReservationSchemas"

export interface IEaterProvider {
    getAll(): Promise<IEater[]>

    getEatersById(eaters: string[]): Promise<IEater[]>
}