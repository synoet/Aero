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

        this.app.get(`/flights/view`, [
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

        this.app.patch(`/flights/:id/status`, [
            controller.updateFlightStatus
        ])

        this.app.get(`/flights/search/:query`, [
            controller.searchFlights
        ])
        this.app.get(`/flights/:id/returns`,[
            controller.getReturnFlightsByID
        ])
        this.app.get(`/flights/search/:departure_date/:arrival_date/:depature_airport/:arrival_airport`,[
            controller.getFlightSearchWithDateRange
        ])

        this.app.get(`/flights/:airline`, [
            controller.getFlightByAirline
        ])
    }
}