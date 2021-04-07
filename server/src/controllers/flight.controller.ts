import Flight from '../models/flight.model';
import express from 'express';
import { MongooseService } from '../services/mongoose.service';

export class FlightController {
    mongooseService: MongooseService = MongooseService.getInstance();
    constructor(){}

    createFlight = async(req: express.Request, res: express.Response) => {
        const flight = new Flight(req.body);
        const newFlight = await flight.save(flight);
        res.status(201).send(newFlight);
    }

    listFlights = async(req: express.Request, res: express.Response) => {
        const flightList = await Flight.find().limit(100).exec();
        res.status(200).send(flightList);
    }
}