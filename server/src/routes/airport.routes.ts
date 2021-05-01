import express from 'express'
import { BaseRoutesConfig, configureRoutes } from '../base/base.routes.config'
import { AirportController } from '../controllers/airport.controller'

export class AirportRoutes extends BaseRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, 'AirportRoutes')
    this.configureRoutes()
  }
  configureRoutes() {
    const controller = new AirportController()

    this.app.post('/airports', [controller.createAirport])
    this.app.get('/listAirports', [controller.listAirports])
  }
}
