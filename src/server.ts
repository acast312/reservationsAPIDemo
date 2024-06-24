import express, { Request, Response, NextFunction} from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { buildContainer } from "./InversionControl";
import { IServer } from "./models/IServer";
import { Container } from "inversify";

export class Server implements IServer {

    private _server: InversifyExpressServer;

    constructor(container: Container) {
        this._server = new InversifyExpressServer(container);
        this._server.setConfig( app => {
            app.use(express.urlencoded({ extended: true }));
            app.use(express.json());
        })
    }

    start(port: number = 3000): void {
        this._server.build().listen(port, () => {
            console.log(`Listening on http://localhost:${port}`)
        })
    }

}