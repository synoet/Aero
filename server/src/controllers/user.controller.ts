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

export class UserController {
    mongooseService: MongooseService = MongooseService.getInstance();
    constructor(){}
}