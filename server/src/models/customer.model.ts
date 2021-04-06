import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const customerSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    building_number: Number,
    street: String,
    city: String,
    state: String,
    phone_number: Number,
    passport_number: String,
    passport_expiration: Date,
    passport_country: String,
    date_of_birth: Date

});
const Customer = MongooseService.getInstance().getMongoose().model('Customer', customerSchema);
export default Customer;