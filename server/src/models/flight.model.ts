import mongoose, {Schema, Document} from 'mongoose';
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface IFlight extends Document{
    flight_number: string;
    departure_date: Date;
    departure_airport_name: string;
    airline_name: string;
    arrival_date: Date;
    arrival_airport_name: string;
    base_price: number;
    airplane_id: string;
    status: string;
}

export const FlightSchema: Schema = new mongoose.Schema({
    flight_number: String,
    departure_date: Date,
    departure_airport_name: String,
    airline_name: String,
    arrival_date: Date,
    arrival_airport_name: String,
    base_price: Number,
    airplane_id: String,
    status: {
        type: String,
        default : null
    }

});
const Flight = mongo.model<IFlight>('Flight', FlightSchema);
export default Flight; 