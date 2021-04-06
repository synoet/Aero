import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const booking_agent_Schema = new mongoose.Schema({
    email: String,
    password: String,
    booking_agent_ID: String,
    commission: Number

});
const Booking_Agent = MongooseService.getInstance().getMongoose().model('Booking_Agent', booking_agent_Schema);
export default Booking_Agent;