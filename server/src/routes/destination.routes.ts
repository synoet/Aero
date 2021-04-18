import express from 'express';
import {BaseRoutesConfig, configureRoutes } from '../base/base.routes.config';
import {DestinationController} from '../controllers/destination.controller'

export class DestinationRoutes extends BaseRoutesConfig implements configureRoutes {
    constructor(app: express.Application){
        super(app, 'FlightRoutes');
        this.configureRoutes();
    }

    configureRoutes() {
        const controller = new DestinationController();

        this.app.get(`/destinations`, [
            controller.listDestinations
        ])

        this.app.post(`/destinations`, [
            controller.createDestination
        ]);
    }
}