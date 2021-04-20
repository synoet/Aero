import express from 'express';
import {BaseRoutesConfig, configureRoutes } from '../base/base.routes.config';
import { UserController } from '../controllers/user.controller';

export class UserRoutes extends BaseRoutesConfig implements configureRoutes {
    constructor(app: express.Application){
        super(app, 'UserRoutes');
        this.configureRoutes();
    }

    configureRoutes() {
        const controller = new UserController();

        this.app.get(`/user/login/:email/:password`, [
            controller.login
        ]);

        this.app.get(`/user/:id`, [
            controller.getUser
        ])

        this.app.post(`/user/signup`, [
            controller.signup
        ])
    }
}