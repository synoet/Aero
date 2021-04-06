import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const DepartureSchema = new mongoose.Schema({
    flight_number: Number,
    airline_name: String,
    departure_time: Date,
    departure_date: Date,
    airport_name: String

})
const Departure = MongooseService.getInstance().getMongoose().model('Departure', DepartureSchema);
export default Departure;