import Airplane from '../models/airplane.model';
import express from 'express';
import {MongooseService} from '../services/mongoose.service';
import { Mongoose } from 'mongoose';
// import * as shortUUID from "short-uuid";

type AirplaneData = {
    id: String,
    seats: Number,
    airline_name: String
}

export class AirplaneController{
    mongooseService: MongooseService = MongooseService.getInstance();
    constructor(){};


    createAirplane = async(req: express.Request, res: express.Response) => {
        const airplaneData: AirplaneData = {
            id: req.body.id,
            seats: req.body.seats,
            airline_name: req.body.airline_name
        }

        const airplane: any = new Airplane(airplaneData);
        const newAirplane = await airplane.save(airplane);
        res.status(201).send(newAirplane);

    }
}