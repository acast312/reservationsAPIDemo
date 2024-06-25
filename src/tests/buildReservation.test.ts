import "reflect-metadata"

import { beforeAll, describe, expect, it, jest } from "@jest/globals"
import { IReservationBuilder } from "../models/IReservationBuilder"
import { IEaterProvider } from "../models/IEaterProvider";
import { Mock} from "moq.ts";
import { IRestaurantProvider } from "../models/IRestaurantProvider";
import { IReservationProvider } from "../models/IReservationProvider";
import { ReservationBuilder } from "../providers/reservationBuilder";
import { IReservation, IRestaurant, Restaurant } from "../models/schemas/ReservationSchemas";

jest.mock("../providers/dbProviders/eaterProvider.ts")

describe("Reservation Builder Tests", () => {
    let reservationBuider: IReservationBuilder;

    let eaterProvider: Mock<IEaterProvider>;
    let restaurantProvider: Mock<IRestaurantProvider>;
    let reservationProvider: Mock<IReservationProvider>;

    beforeAll(() => {
        eaterProvider = new Mock<IEaterProvider>()
        restaurantProvider = new Mock<IRestaurantProvider>()
        reservationProvider = new Mock<IReservationProvider>()

        reservationBuider = new ReservationBuilder(eaterProvider.object(), restaurantProvider.object(), reservationProvider.object())

    })

    it("successfully builds a reservation when tables are available", () => {
        
        const reservationTime = new Date()
        const endTime = new Date(reservationTime)
        endTime.setHours(endTime.getHours() + 2)

        const restaurant: IRestaurant = {
            name: "a",
            twoTop: 1,
            fourTop: 0,
            sixTop: 0,
            endorsements: []
        }

        const eaters = ["a", "b"]

        const expected: IReservation = {
            startTime: reservationTime,
            endTime: endTime,
            eaters: ["a", "b"],
            numEaters: 2,
            restaurant: "a",
            table: "twoTop"
        }

        const actual = reservationBuider.buildReservation(reservationTime, eaters, restaurant)

        expect(actual).toEqual(expected)
    })

    it("successfully builds a reservation when larger tables are available", () => {
        
        const reservationTime = new Date()
        const endTime = new Date(reservationTime)
        endTime.setHours(endTime.getHours() + 2)

        const restaurant: IRestaurant = {
            name: "a",
            twoTop: 0,
            fourTop: 2,
            sixTop: 0,
            endorsements: []
        }

        const eaters = ["a", "b"]

        const expected: IReservation = {
            startTime: reservationTime,
            endTime: endTime,
            eaters: ["a", "b"],
            numEaters: 2,
            restaurant: "a",
            table: "fourTop"
        }

        const actual = reservationBuider.buildReservation(reservationTime, eaters, restaurant)

        expect(actual).toEqual(expected)
    })

    it("successfully handles large reservation", () => {
        
        const reservationTime = new Date()
        const endTime = new Date(reservationTime)
        endTime.setHours(endTime.getHours() + 2)

        const restaurant: IRestaurant = {
            name: "a",
            twoTop: 1,
            fourTop: 0,
            sixTop: 1,
            endorsements: []
        }

        const eaters = ["a", "b", "c", "d", "e", "f"]

        const expected: IReservation = {
            startTime: reservationTime,
            endTime: endTime,
            eaters: eaters,
            numEaters: 6,
            restaurant: "a",
            table: "sixTop"
        }

        const actual = reservationBuider.buildReservation(reservationTime, eaters, restaurant)

        expect(actual).toEqual(expected)
    })

    
})