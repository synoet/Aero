import express  from 'express';
import * as http from 'http';
const app: express.Application = express();
const router = express.Router();
const server: http.Server = http.createServer(app);

const routes: any = [];

import dotenv from 'dotenv';
import { BaseRoutesConfig } from './base/base.routes.config';
import { FlightRoutes } from './routes/flight.routes';
dotenv.config();

app.use(express.json());
const port = process.env.PORT;
app.use(express.urlencoded());

routes.push(new FlightRoutes(app));



server.listen(port, () => {
    console.log(`Server Running at port ${port}`)
    routes.forEach((route: BaseRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
})

export default app;


