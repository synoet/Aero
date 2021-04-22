import mongoose, {Schema, Document} from 'mongoose'
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface ITransaction extends Document {
    ticket_id: String,
    customer_email: String,
    booking_agent_email: String
}

const TransactionSchema: Schema  = new mongoose.Schema({
    ticket_id: String,
    customer_email: String,
    booking_agent_email: String

});
const Transaction = mongo.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;