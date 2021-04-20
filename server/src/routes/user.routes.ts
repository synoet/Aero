import express from 'express';
import {BaseRoutesConfig, configureRoutes } from '../base/base.routes.config';
import { UserController } from '../controllers/user.controller';

export class FlightRoutes extends BaseRoutesConfig implements configureRoutes {
    constructor(app: express.Application){
        super(app, 'UserRoutes');
        this.configureRoutes();
    }

    configureRoutes() {
        const controller = new UserController();

        this.app.post(`/user/login`, [
            controller.login
        ]);

        this.app.post(`/user/signup`, [
            controller.signup
        ])
    }
}