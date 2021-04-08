import Flight from '../models/flight.model';
import express from 'express';
import { MongooseService } from '../services/mongoose.service';
import * as shortUUID from "short-uuid";

type FlightData = {
    flight_number: string,
    departure_date: Date,
    departure_airport_name: string,
    airline_name: string,
    arrival_date: Date,
    arrival_airport_name: string,
    base_price: number;
    airplane_id: string;
    status: string;
}

export class FlightController {
    mongooseService: MongooseService = MongooseService.getInstance();
    constructor(){}

    createFlight = async(req: express.Request, res: express.Response) => {
        let randHours = Math.floor(Math.random() * 72)
        let departureDate = new Date();
        departureDate.setHours(departureDate.getHours() + randHours);

        let arrivalDate = new Date();
        arrivalDate.setHours(arrivalDate.getHours() + Math.floor(Math.random() * 18) + randHours);

        const flightData: FlightData = {
            flight_number: shortUUID.generate(),
            departure_date: departureDate,
            departure_airport_name: req.body.departure_airport_name,
            airline_name: req.body.airline_name,
            arrival_date: arrivalDate,
            arrival_airport_name: req.body.arrival_airport_name,
            base_price: req.body.base_price,
            airplane_id: req.body.airlplane_id,
            status: req.body.status
        }
        const flight: any = new Flight(flightData);
        const newFlight = await flight.save(flight);
        res.status(201).send(newFlight);
    }

    listFlights = async(req: express.Request, res: express.Response) => {
        const flightList = await Flight.find().limit(100).sort({arrival_date: 'desc'}).exec();
        res.status(200).send(flightList);
    }

    getFlightById = async(req: express.Request, res: express.Response) => {
        // _id is generated automatically
        const flight = await Flight.findOne({_id: req.params.id});
        res.status(200).send(flight);
    }

    getFlightsView = async(req: express.Request, res: express.Response) => {
        const currentDate = new Date();
        let upcomingResponse = await Flight.find({}).limit(100).sort({departure_date: 'desc'}).exec()
        let upcomingFlights = upcomingResponse.filter(flight => flight.departure_date > currentDate).slice(0, 4);

        res.status(200).send({
            upcomingFlights: upcomingFlights,
            delayedFlights: await Flight.find({status: 'delayed'}).exec(),
            allFlights: await Flight.find().limit(100).exec(),
        });
    }
}