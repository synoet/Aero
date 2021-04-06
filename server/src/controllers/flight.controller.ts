import Flight from '../models/flight.model';
import express from 'express';


export const createFlights = async (req: express.Request , res: express.Response) => {
    console.log(req.body);
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).send(flight);
}