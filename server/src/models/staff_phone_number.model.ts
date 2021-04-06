import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const staff_phone_Schema = new mongoose.Schema({
    username: String,
    phone_Number: Number

});
const Staff_phone = MongooseService.getInstance().getMongoose().model('Airplane', staff_phone_Schema);
export default Staff_phone;