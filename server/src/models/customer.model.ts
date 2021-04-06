import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const customerSchema = new mongoose.Schema({

})
const Customer = MongooseService.getInstance().getMongoose().model('Customer', customerSchema);
export default Customer;