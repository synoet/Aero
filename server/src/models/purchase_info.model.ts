import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const purchase_info_Schema = new mongoose.Schema({
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
const Purchase_info = MongooseService.getInstance().getMongoose().model('Purchase_info', purchase_info_Schema);
export default Purchase_info;