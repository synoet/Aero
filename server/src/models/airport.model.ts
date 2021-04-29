import mongoose from "mongoose";
import { MongooseService } from "../services/mongoose.service";
const AirportSchema = new mongoose.Schema({
  name: String,
  city: String,
});
const Airport = MongooseService.getInstance()
  .getMongoose()
  .model("Airport", AirportSchema);
export default Airport;
