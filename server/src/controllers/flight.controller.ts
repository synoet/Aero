import Flight from '../models/flight.model';
import express from 'express';
import { MongooseService } from '../services/mongoose.service';

export class FlightController {
    mongooseService: MongooseService = MongooseService.getInstance();
    constructor(){}

    listFlights = async(req: express.Request, res: express.Response) => {
        const flight = new Flight(req.body);
        const newFlight = flight.save(flight);
        res.status(201).send(newFlight);

    }
}