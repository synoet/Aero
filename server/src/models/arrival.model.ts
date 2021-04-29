import mongoose from 'mongoose'
import { MongooseService } from '../services/mongoose.service'
const ArrivalSchema = new mongoose.Schema({
  flight_number: Number,
  airline_name: String,
  arrival_time: Date,
  arrival_date: Date,
  airport_name: String,
})
const Arrival = MongooseService.getInstance().getMongoose().model('Arrival', ArrivalSchema)
export default Arrival
