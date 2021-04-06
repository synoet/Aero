import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const TransactionSchema = new mongoose.Schema({
    ticket_id: String,
    customer_email: String,
    booking_agent_email:{
        type: String,
        default: null
    }

});
const Transaction = MongooseService.getInstance().getMongoose().model('Transaction', TransactionSchema);
export default Transaction;