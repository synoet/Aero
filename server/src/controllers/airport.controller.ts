import Airport from '../models/airport.model'
import express, { request } from 'express'
import { MongooseService } from '../services/mongoose.service'

type AirportData = {
    name: string,
    city: string
}

export class AirportController {
    mongooseService: MongooseService = MongooseService.getInstance()
    constructor() {}

    createAirport = async (req: express.Request, res: express.Response) => {
        const airportData: AirportData = {
            name: req.body.name,
            city: req.body.city
        }
        const airport: any = new Airport(airportData)
        const newAirport = await airport.save(airport)
        res.status(201).send(newAirport);
    }

    listAirports = async(req: express.Request, res: express.Response) => {
        const airportList = await Airport.find(); 
        res.status(200).send(airportList);
    }
}