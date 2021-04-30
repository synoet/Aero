import mongoose, { Schema, Document } from 'mongoose'
import { MongooseService } from '../services/mongoose.service'

const mongo = MongooseService.getInstance().getMongoose()

export interface ICustomer extends Document {
  _id: string
  email: string
  name: string
  password: string
  building_number: number
  street: string
  city: string
  state: string
  phone_number: string
  passport_number: number
  passport_expiration: Date
  passport_country: string
  date_of_birth: Date
  booking_agent_email: {
    type: string
    default: null
  }
}

const CustomerSchema: Schema = new mongoose.Schema({
  _id: String,
  email: String,
  name: String,
  password: String,
  building_number: Number,
  street: String,
  city: String,
  state: String,
  phone_number: Number,
  passport_number: String,
  passport_expiration: Date,
  passport_country: String,
  date_of_birth: Date,
  booking_agent_email: {
    type: String,
    default: null,
  },
})
const Customer = mongo.model<ICustomer>('Customer', CustomerSchema)

export default Customer
