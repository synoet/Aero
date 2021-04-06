import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const airplaneSchema = new mongoose.Schema({

})
const Airplane = MongooseService.getInstance().getMongoose().model('Airplane', airplaneSchema);
export default Airplane;