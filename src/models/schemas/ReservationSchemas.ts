import { Schema, model } from "mongoose";

export interface IEater {
    name: string,
    dietaryRestrictions: string[]
}

const eaterSchema = new Schema({
    name: String,
    dietaryRestrictions: Array<String>
})

export interface IReservation {
    startTime: Date,
    endTime: Date,
    eaters: string[],
    numEaters: number,
    restaurant: string
}

const reservationSchema = new Schema({
    startTime: Date,
    endTime: Date,
    eaters: Array<String>,
    numEaters: Number,
    restaurant: String,
    
})

export interface IRestaurant {
    name: string, 
    twoTop: number,
    fourTop: number,
    sixTop: number,
    endorsements: string[]
}

const restaurantSchema = new Schema({
    name: String,
    twoTop: Number,
    fourTop: Number,
    sixTop: Number,
    endorsements: Array<String>
})

export const Eater = model<IEater>('Eater', eaterSchema);
export const Reservation = model<IReservation>('Reservation', reservationSchema);
export const Restaurant = model<IRestaurant>('Restauran', restaurantSchema);
