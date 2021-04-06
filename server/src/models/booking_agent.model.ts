import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const BookingAgentSchema = new mongoose.Schema({
    email: String,
    password: String,
    booking_agent_id: String,
    commission: Number

});
const BookingAgent = MongooseService.getInstance().getMongoose().model('BookingAgent', BookingAgentSchema);
export default BookingAgent;