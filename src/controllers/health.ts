import {Request, Response, NextFunction} from 'express';
import { interfaces, httpGet, controller } from 'inversify-express-utils';

@controller('/health')
export class HealthController implements interfaces.Controller {
    constructor(){ }

    @httpGet("/")
    public health(req: Request, res: Response, next: NextFunction):any {
        return res.sendStatus(200)
    }
}
