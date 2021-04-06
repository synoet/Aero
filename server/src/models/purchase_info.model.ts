import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const purchase_info_Schema = new mongoose.Schema({

})
const Purchase_info = MongooseService.getInstance().getMongoose().model('Purchase_info', purchase_info_Schema);
export default Purchase_info;