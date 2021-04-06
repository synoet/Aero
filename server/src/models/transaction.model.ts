import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const transactionSchema = new mongoose.Schema({
    ticket_ID: String,
    customer_email: String,
    booking_agent_email:{
        type: String,
        default: null
    }

});
const Transaction = MongooseService.getInstance().getMongoose().model('Transaction', transactionSchema);
export default Transaction;