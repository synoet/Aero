import mongoose, {Schema, Document} from 'mongoose';
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface IPurchaseInfo extends Document {
    ticket_ID: string,
    purchase_ID: string,
    sold_price: number,
    card_type: string,
    card_number: number,
    card_Name: string,
    //card_expiration: Date,
    card_expiration: String,
    //purchase_time: Date,
    purchase_date: Date,
    booking_ID: string
}

const PurchaseInfoSchema = new mongoose.Schema({
    ticket_ID: String,
    purchase_ID: String,
    sold_price: Number,
    card_type: String,
    card_number: Number,
    card_Name: String,
    //card_expiration: Date,
    card_expiration: String,
    //purchase_time: Date,
    purchase_date: Date,
    booking_ID: String

});
const PurchaseInfo = mongo.model<IPurchaseInfo>('PurchaseInfo', PurchaseInfoSchema);
export default PurchaseInfo;