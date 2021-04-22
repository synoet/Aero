import express from 'express';
import {BaseRoutesConfig, configureRoutes } from '../base/base.routes.config';
import { TransactionController } from '../controllers/transaction.controller';

export class TransactionRoutes extends BaseRoutesConfig implements configureRoutes {
    constructor(app: express.Application){
        super(app, 'UserRoutes');
        this.configureRoutes();
    }
    configureRoutes(){

    }
}
    