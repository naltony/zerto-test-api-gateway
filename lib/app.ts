import * as express from "express";
import * as bodyParser from "body-parser";
import * as proxyRouteConfig from './config.json';
import * as proxy from "express-http-proxy";
import * as morgan from "morgan";

class App {

    public app: express.Application;
    public routes: any[];

    constructor() {
        this.app = express();
        this.config();
        this.routes = (<any>proxyRouteConfig).routes;

        this.routes.map((route)=> {
            console.log('proxy: ', route);
            this.app.use(route.route, proxy(route.address));

        });
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan('combined'))

        this.app.listen(3000);
    }
}

export default new App().app;