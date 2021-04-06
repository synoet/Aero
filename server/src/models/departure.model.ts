import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const departureSchema = new mongoose.Schema({
    flight_Number: Number,
    airline_name: String,
    departure_time: Date,
    departure_date: Date,
    airport_name: String

})
const Departure = MongooseService.getInstance().getMongoose().model('Departure', departureSchema);
export default Departure;