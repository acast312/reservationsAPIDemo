import { Schema, model } from "mongoose";

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

export const Eater = model('Eater', eaterSchema);
export const Reservation = model('Reservation', reservationSchema);
export const Restaurant = model('Restauran', restaurantSchema);
