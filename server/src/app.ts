import express  from 'express';
import * as http from 'http';
const app: express.Application = express();
const router = express.Router();
const server: http.Server = http.createServer(app);
const routes: any = [];
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import { BaseRoutesConfig } from './base/base.routes.config';
import { FlightRoutes } from './routes/flight.routes';
import { MongooseService } from './services/mongoose.service';
import { Mongoose } from 'mongoose';

dotenv.config();


app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT;


routes.push(new FlightRoutes(app));





server.listen(port, () => {
    console.log(`Server Running at port ${port}`)
    routes.forEach((route: BaseRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
})

export default app;


