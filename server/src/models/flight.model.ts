import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const FlightSchema = new mongoose.Schema({
    Flight_number: Number,
    Departure_Date: Date,
    Departure_Time: Date, 
    Airline_name: String,
    Arrival_Date: Date,
    Arrival_Time: Date,
    Base_price: Number,
    Airplane_ID: String,
    Status: {
        type: String,
        default : null
    }

});
const Flight = MongooseService.getInstance().getMongoose().model('Flight', FlightSchema);
export default Flight; 