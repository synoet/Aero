import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const staffSchema = new mongoose.Schema({

})
const Staff = MongooseService.getInstance().getMongoose().model('Staff', staffSchema);
export default Staff;