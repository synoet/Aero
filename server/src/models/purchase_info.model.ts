import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const PurchaseInfoSchema = new mongoose.Schema({
    ticket_ID: String,
    purchase_ID: String,
    sold_price: Number,
    card_type: String,
    card_number: Number,
    card_Name: String,
    card_expiration: Date,
    purchase_time: Date,
    purchase_date: Date,
    booking_ID:{
        type: String,
        default: null
    }

});
const PurchaseInfo = MongooseService.getInstance().getMongoose().model('PurchaseInfo', PurchaseInfoSchema);
export default PurchaseInfo;