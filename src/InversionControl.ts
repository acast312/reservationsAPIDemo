import { Container } from "inversify";
import { DbService, buildDB } from "./services/DBService";
import { TYPES } from "./models/types";

// import controllers
import "./controllers/health"
import "./controllers/eaters"
import { IEaterProvider } from "./models/IEaterProvider";
import { EaterProvider } from "./providers/eaterProvider";

export const buildContainer = async ():Promise<Container> => {
    const container = new Container();

    // bind dbService
    const dbService = await buildDB();
    container.bind<DbService>(TYPES.DbService).toConstantValue(dbService)

    // bind providers
    container.bind<IEaterProvider>(TYPES.IEaterProvider).to(EaterProvider)

    return container;
}

