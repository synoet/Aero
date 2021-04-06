import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const airportSchema = new mongoose.Schema({
    name: String,
    city: String

});
const Airport = MongooseService.getInstance().getMongoose().model('Airport', airportSchema);
export default Airport;