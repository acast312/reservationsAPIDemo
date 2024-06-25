import "reflect-metadata"

import { beforeAll, describe, expect, it, jest } from "@jest/globals"
import { IReservationBuilder } from "../models/IReservationBuilder"
import { IEaterProvider } from "../models/IEaterProvider";
import { Mock} from "moq.ts";
import { IRestaurantProvider } from "../models/IRestaurantProvider";
import { IReservationProvider } from "../models/IReservationProvider";
import { ReservationBuilder } from "../providers/reservationBuilder";
import { ITableOccupancy } from "../models/ITableOccupancy";
import { IReservation } from "../models/schemas/ReservationSchemas";

jest.mock("../providers/dbProviders/eaterProvider.ts")

describe("Occupancy Builder Tests", () => {
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

    it("Empty Reservation list returns default occupancy", () => {
        const reservations: IReservation[] = []
        const expected: ITableOccupancy = {
            twoTop: 0,
            fourTop: 0,
            sixTop: 0
        }

        const actual = reservationBuider.buildRestaurantOccupancy(reservations)
        expect(actual).toEqual(expected)
    })

    it("properly sums all table specific usages", () => {
        const reservations: IReservation[] = [
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1"],
                numEaters: 1,
                table: "twoTop",
                restaurant: "a"
            },
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1"],
                numEaters: 1,
                table: "twoTop",
                restaurant: "a"
            },
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1"],
                numEaters: 1,
                table: "twoTop",
                restaurant: "a"
            }
        ]

        const expected: ITableOccupancy = {
            twoTop: 3,
            fourTop: 0,
            sixTop: 0
        }

        const actual = reservationBuider.buildRestaurantOccupancy(reservations)
        expect(actual).toEqual(expected)
    })

    it("properly sums all table specific usages, multiple types", () => {
        const reservations: IReservation[] = [
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1"],
                numEaters: 1,
                table: "twoTop",
                restaurant: "a"
            },
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1"],
                numEaters: 1,
                table: "twoTop",
                restaurant: "a"
            },
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1","eater2","eater4"],
                numEaters: 3,
                table: "fourTop",
                restaurant: "a"
            },
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1","eater2","eater4"],
                numEaters: 3,
                table: "fourTop",
                restaurant: "a"
            }
        ]

        const expected: ITableOccupancy = {
            twoTop: 2,
            fourTop: 2,
            sixTop: 0
        }

        const actual = reservationBuider.buildRestaurantOccupancy(reservations)

        expect(actual).toEqual(expected)
    })

    it("properly sums all table  usages", () => {
        const reservations: IReservation[] = [
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1"],
                numEaters: 1,
                table: "twoTop",
                restaurant: "a"
            },
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1"],
                numEaters: 3,
                table: "fourTop",
                restaurant: "a"
            },
            {
                startTime: new Date(),
                endTime: new Date(),
                eaters: ["eater1"],
                numEaters: 5,
                table: "sixTop",
                restaurant: "a"
            }
        ]

        const expected: ITableOccupancy = {
            twoTop: 1,
            fourTop: 1,
            sixTop: 1
        }

        const actual = reservationBuider.buildRestaurantOccupancy(reservations)
        expect(actual).toEqual(expected)
    })

})