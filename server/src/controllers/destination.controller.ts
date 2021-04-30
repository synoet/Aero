import Destination from '../models/destination.model'
import express from 'express'
import { MongooseService } from '../services/mongoose.service'

interface DestinationData {
  location: string
  airport: string
  image: string
}
export class DestinationController {
  mongooseService: MongooseService = MongooseService.getInstance()
  constructor() {}

  createDestination = async (req: express.Request, res: express.Response) => {
    const destinationData: DestinationData = {
      location: req.body.location,
      airport: req.body.airport,
      image: req.body.image,
    }
    const destination: any = new Destination(destinationData)
    const newDestination = await destination.save(destination)
    res.status(201).send(newDestination)
  }

  listDestinations = async (req: express.Request, res: express.Response) => {
    const destinations = await Destination.find().limit(100).exec()
    res.status(200).send(destinations)
  }
}
