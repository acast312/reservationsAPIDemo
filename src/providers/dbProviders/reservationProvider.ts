import { injectable } from "inversify";
import { IReservationProvider } from "../../models/IReservationProvider";
import { IReservation, Reservation } from "../../models/schemas/ReservationSchemas";

@injectable()
export class ReservationProvider implements IReservationProvider {
    
    async getAll(): Promise<IReservation[]> {
        const reservations = await Reservation.find()
        return reservations
    }

}
