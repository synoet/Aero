import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const airlineSchema = new mongoose.Schema({

})
const Airline = MongooseService.getInstance().getMongoose().model('Airline', airlineSchema);
export default Airline;