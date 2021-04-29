import Airplane from "../models/airplane.model";
import express from "express";
import { MongooseService } from "../services/mongoose.service";
import * as shortUUID from "short-uuid";

type AirplaneData = {
  id: string;
  seats: number;
  airline_name: string;
};

export class AirplaneController {
  mongooseService: MongooseService = MongooseService.getInstance();
  constructor() {}

  createAirplane = async (req: express.Request, res: express.Response) => {
    const airplaneData: AirplaneData = {
      id: shortUUID.generate(),
      seats: req.body.seats,
      airline_name: req.body.airline_name,
    };
    const airplane: any = new Airplane(airplaneData);
    const newAirplane = await airplane.save(airplane);
    res.status(201).send(newAirplane);
  };

  listAirplanes = async (req: express.Request, res: express.Response) => {
    const airplanes = await Airplane.find().limit(100).exec();
    res.status(200).send(airplanes);
  };
}
