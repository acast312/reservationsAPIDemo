import { buildDB } from "./src/services/DBService"
import { Eater, Reservation, Restaurant } from "./src/models/schemas/ReservationSchemas"
import { ExceptionResult } from "inversify-express-utils/lib/results"

const eaters = [
    {
        name: "michael",
        dietaryRestrictions: ["Vegetarian"]
    },
    {
        name: "George Michael",
        dietaryRestrictions: ["Vegetarian","Gluten-Free"]
    },
    {
        name: "Lucile",
        dietaryRestrictions: ["Gluten-Free"]
    },
    {
        name: "Gob",
        dietaryRestrictions: ["Paleo"]
    },
    {
        name: "Tobias",
        dietaryRestrictions: []
    },
    {
        name: "Maeby",
        dietaryRestrictions: ["Vegan"]
    }
]

const restaurants = [
    {
        name: "Lardo",
        twoTop: 4,
        fourTop: 2,
        sixTop: 1,
        endorsements: ["Gluten-Free"]
    },
    {
        name: "Panaderia Rosetta",
        twoTop: 3,
        fourTop: 2,
        sixTop: 0,
        endorsements: ["Gluten-Free","Vegetarian"]
    },
    {
        name: "Tetetlan",
        twoTop: 4,
        fourTop: 2,
        sixTop: 1,
        endorsements: ["Gluten-Free", "Paleo"]
    },
    {
        name: "Fallin Piano Brewing Co",
        twoTop: 5,
        fourTop: 5,
        sixTop: 5,
        endorsements: []
    },
    {
        name: "u.to.pi.a",
        twoTop: 2,
        fourTop: 0,
        sixTop: 0,
        endorsements: ["Vegan", "Vegetarian"]
    },
]

const seedDb = async () => {
    const dbClient = await buildDB()
    eaters.forEach(async eater => {
        const eaterModel = new Eater(eater)
        await eaterModel.save()
    })
    restaurants.forEach(async restaurant => {
        const restaurantModel = new Restaurant(restaurant)
        await restaurantModel.save()
    })

    return;
}


seedDb().finally()
