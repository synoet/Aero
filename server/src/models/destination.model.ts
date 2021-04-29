import mongoose, { Schema, Document } from "mongoose";
import { MongooseService } from "../services/mongoose.service";

const mongo = MongooseService.getInstance().getMongoose();

export interface IDestination extends Document {
  location: string;
  airport: string;
  image: string;
  visits: number;
}

export const DestinationSchema: Schema = new mongoose.Schema({
  location: String,
  airport: String,
  image: String,
  visits: {
    type: Number,
    default: Math.floor(Math.random() * 10) + 1,
  },
});
const Destination = mongo.model<IDestination>("Destination", DestinationSchema);
export default Destination;
