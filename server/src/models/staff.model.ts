import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const StaffSchema = new mongoose.Schema({
    username: String,
    airline_name: String,
    password: String

});
const Staff = MongooseService.getInstance().getMongoose().model('Staff', StaffSchema);
export default Staff;