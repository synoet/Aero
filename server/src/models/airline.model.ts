import mongoose from 'mongoose'
import { MongooseService } from '../services/mongoose.service'
const AirlineSchema = new mongoose.Schema({
  airline_name: String,
})
const Airline = MongooseService.getInstance().getMongoose().model('Airline', AirlineSchema)
export default Airline
