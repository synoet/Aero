import express from 'express';
import {BaseRoutesConfig, configureRoutes } from '../base/base.routes.config';
import {FlightController} from '../controllers/flight.controller'

export class FlightRoutes extends BaseRoutesConfig implements configureRoutes {
    constructor(app: express.Application){
        super(app, 'FlightRoutes');
        this.configureRoutes();
    }

    configureRoutes() {
        const controller = new FlightController();

        this.app.get(`/flightsview`, [
            controller.getFlightsView
        ])

        this.app.post(`/flights`, [
            controller.createFlight
        ]);

        this.app.get(`/flights`, [
            controller.listFlights
        ])

        this.app.get(`/flights/:id`, [
            controller.getFlightById
        ])
    }
}