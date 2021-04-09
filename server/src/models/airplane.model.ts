import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface IAirplane extends Document{
    id: String,
    seats: Number,
    airline_name: String
}

export const AirplaneSchema = new mongoose.Schema({
    id: String,
    seats: Number,
    airline_name: String

});

const Airplane = mongo.model('Airplane', AirplaneSchema);
export default Airplane;