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

        this.app.post(`/flights`, [
            controller.listFlights
        ]);
    }
}