import { Schema, model } from "mongoose";

export interface IEater {
    name: string,
    dietaryRestrictions: string[]
}

const eaterSchema = new Schema({
    name: String,
    dietaryRestrictions: Array<String>
})

const reservationSchema = new Schema({
    startTime: Date,
    endTime: Date,
    eaters: Array<String>,
    numEaters: Number,
    restaurant: String,
    
})

const restaurantSchema = new Schema({
    name: String,
    twoTop: Number,
    fourTop: Number,
    sixTop: Number,
    endorsements: Array<String>
})

export const Eater = model<IEater>('Eater', eaterSchema);
export const Reservation = model('Reservation', reservationSchema);
export const Restaurant = model('Restauran', restaurantSchema);
