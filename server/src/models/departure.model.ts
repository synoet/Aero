import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const departureSchema = new mongoose.Schema({

})
const Departure = MongooseService.getInstance().getMongoose().model('Departure', departureSchema);
export default Departure;