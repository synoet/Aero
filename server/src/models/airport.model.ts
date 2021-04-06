import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const airportSchema = new mongoose.Schema({

})
const Airport = MongooseService.getInstance().getMongoose().model('Airport', airportSchema);
export default Airport;