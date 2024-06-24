import { IReservation } from "./schemas/ReservationSchemas";

export interface IReservationProvider {
    getAll(): Promise<IReservation[]>
}