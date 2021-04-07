import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();
export const FlightSchema = new mongoose.Schema({
    flight_number: Number,
    departure_date: Date,
    departure_time: Date, 
    airline_name: String,
    arrival_date: Date,
    arrival_time: Date,
    base_price: Number,
    airplane_id: String,
    status: {
        type: String,
        default : null
    }

});
const Flight = mongo.model('Flight', FlightSchema);
export default Flight; 