import express from "express";
import { BaseRoutesConfig, configureRoutes } from "../base/base.routes.config";
import { UserController } from "../controllers/user.controller";

export class UserRoutes extends BaseRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
    this.configureRoutes();
  }

  configureRoutes() {
    const controller = new UserController();

    this.app.get(`/user/login/:email/:password`, [controller.login]);

    this.app.get(`/user/:id`, [controller.getUser]);

    this.app.post(`/user/signup`, [controller.signup]);

    this.app.get(`/user/:id/spending`, [controller.spending]);

    this.app.get(`/user/:id/revenue`, [controller.revenue]);

    this.app.get(`/user/:id/tickets`, [controller.tickets]);

    this.app.get(`/user/:id/flights`, [controller.flights]);
  }
}
