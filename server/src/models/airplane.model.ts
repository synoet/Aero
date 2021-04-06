import mongoose from 'mongoose';
import { setupMaster } from 'node:cluster';
import {MongooseService} from '../services/mongoose.service';
const airplaneSchema = new mongoose.Schema({
    ID: String,
    seats: Number,
    airline_name: String

});
const Airplane = MongooseService.getInstance().getMongoose().model('Airplane', airplaneSchema);
export default Airplane;