import { Container } from "inversify";
import { DbService, buildDB } from "./services/DBService";
import { TYPES } from "./models/types";

// import controllers
import "./controllers/health"
import "./controllers/eaters"
import "./controllers/restaurants"
import "./controllers/reservations"

// import providers
import { IEaterProvider } from "./models/IEaterProvider";
import { EaterProvider } from "./providers/dbProviders/eaterProvider";
import { IReservationProvider } from "./models/IReservationProvider";
import { ReservationProvider } from "./providers/dbProviders/reservationProvider";
import { IRestaurantProvider } from "./models/IRestaurantProvider";
import { RestaurantProvider } from "./providers/dbProviders/restaurantProvider";
import { IReservationBuilder } from "./models/IReservationBuilder";
import { ReservationBuilder } from "./providers/reservationBuilder";

export const buildContainer = async ():Promise<Container> => {
    const container = new Container();

    // bind dbService
    const dbService = await buildDB();
    container.bind<DbService>(TYPES.DbService).toConstantValue(dbService);

    // bind providers
    container.bind<IEaterProvider>(TYPES.IEaterProvider).to(EaterProvider);
    container.bind<IReservationProvider>(TYPES.IReservationProvider).to(ReservationProvider);
    container.bind<IRestaurantProvider>(TYPES.IRestaurantProvider).to(RestaurantProvider);

    // this is the base provider responsible for most of the logic we will be using
    // It depebds on the DB providers above therefore we need to declare it after them
    container.bind<IReservationBuilder>(TYPES.IReservationBuilder).to(ReservationBuilder)

    return container;
}

