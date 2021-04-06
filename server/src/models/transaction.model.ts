import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const transactionSchema = new mongoose.Schema({

})
const Transaction = MongooseService.getInstance().getMongoose().model('Transaction', transactionSchema);
export default Transaction;