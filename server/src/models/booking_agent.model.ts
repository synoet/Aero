import mongoose, { Schema, Document } from "mongoose";
import { MongooseService } from "../services/mongoose.service";

const mongo = MongooseService.getInstance().getMongoose();

export interface IBookingAgent extends Document {
  _id: string;
  email: string;
  password: string;
  commission: number;
}

const BookingAgentSchema: Schema = new mongoose.Schema({
  _id: String,
  email: String,
  password: String,
  commission: Number,
});

const BookingAgent = mongo.model<IBookingAgent>(
  "BookingAgent",
  BookingAgentSchema
);

export default BookingAgent;
