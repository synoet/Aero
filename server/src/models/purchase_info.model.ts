import mongoose, { Schema, Document } from 'mongoose'
import { MongooseService } from '../services/mongoose.service'

const mongo = MongooseService.getInstance().getMongoose()

export interface IPurchaseInfo extends Document {
  _id: string
  ticket_id: string
  transaction_id: string
  sold_price: number
  card_type: string
  card_number: number
  card_name: string
  card_expiration: Date
  purchase_date: Date
  booking_id: string
}

const PurchaseInfoSchema: Schema = new mongoose.Schema({
  _id: String,
  ticket_id: String,
  transaction_id: String,
  sold_price: Number,
  card_type: String,
  card_number: Number,
  card_Name: String,
  card_expiration: Date,
  purchase_date: Date,
  booking_id: String,
})
const PurchaseInfo = mongo.model<IPurchaseInfo>('PurchaseInfo', PurchaseInfoSchema)
export default PurchaseInfo
