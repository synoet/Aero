import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const AirplaneSchema = new mongoose.Schema({
    ID: String,
    seats: Number,
    airline_name: String

});
const Airplane = MongooseService.getInstance().getMongoose().model('Airplane', AirplaneSchema);
export default Airplane;