import express  from 'express';
import * as http from 'http';
const app: express.Application = express();
const router = express.Router();
const server: http.Server = http.createServer(app);
const routes: any = [];
import dotenv from 'dotenv';
import { BaseRoutesConfig } from './base/base.routes.config';
import { FlightRoutes } from './routes/flight.routes';
import { AirplaneRoutes } from './routes/airplane.routes';
import { DestinationRoutes } from './routes/destination.routes';

import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../swagger.json');


dotenv.config();


app.use(express.json());
app.use(express.urlencoded());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    } else {
        return next();
    }
});

const port = process.env.PORT;
routes.push(new FlightRoutes(app));
routes.push(new AirplaneRoutes(app));
routes.push(new DestinationRoutes(app));

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


server.listen(port, () => {
    console.log(`Server Running at port ${port}`)
    routes.forEach((route: BaseRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
})

export default app;


