import mongoose, {Schema, Document} from 'mongoose';
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface IDeparture extends Document {
    flight_number: number;
    airline_name: string;
    departure_time: Date;
    departure_date: Date;
    airport_name: String;
}

const DepartureSchema: Schema = new mongoose.Schema({
    flight_number: Number,
    airline_name: String,
    departure_time: Date,
    departure_date: Date,
    airport_name: String

})
const Departure = mongo.model<IDeparture>('Departure', DepartureSchema);
export default Departure;