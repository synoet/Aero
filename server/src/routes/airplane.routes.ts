import express from "express";
import { BaseRoutesConfig, configureRoutes } from "../base/base.routes.config";
import { AirplaneController } from "../controllers/airplane.controller";

export class AirplaneRoutes
  extends BaseRoutesConfig
  implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "AirplaneRoutes");
    this.configureRoutes();
  }

  configureRoutes() {
    const controller = new AirplaneController();

    this.app.post(`/airplanes`, [controller.createAirplane]);

    this.app.get(`/airplanes`, [controller.listAirplanes]);
  }
}
