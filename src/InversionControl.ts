import { Container } from "inversify";
import "./controllers/health"
import { DbService, buildDB } from "./services/DBService";
import { TYPES } from "./models/types";

export const buildContainer = async ():Promise<Container> => {
    const container = new Container();

    // bind dbService
    const dbService = await buildDB();
    container.bind<DbService>(TYPES.DbService).toConstantValue(dbService)

    return container;
}

