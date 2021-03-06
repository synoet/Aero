import express from 'express'
import { BaseRoutesConfig, configureRoutes } from '../base/base.routes.config'
import { TransactionController } from '../controllers/transaction.controller'

export class TransactionRoutes extends BaseRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, 'TransactionRoutes')
    this.configureRoutes()
  }
  configureRoutes() {
    const controller = new TransactionController()
    this.app.post(`/transaction`, [controller.createTransaction])
  }
}
