import mongoose, { Schema, Document } from 'mongoose'
import { MongooseService } from '../services/mongoose.service'

const mongo = MongooseService.getInstance().getMongoose()

export interface IAirplane extends Document {
  id: string
  seats: number
  airline_name: string
}

export const AirplaneSchema: Schema = new mongoose.Schema({
  id: String,
  seats: Number,
  airline_name: String,
})

const Airplane = mongo.model<IAirplane>('Airplane', AirplaneSchema)
export default Airplane
