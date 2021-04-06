import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const arrivalSchema = new mongoose.Schema({

})
const Arrival = MongooseService.getInstance().getMongoose().model('Arrival', arrivalSchema);
export default Arrival;