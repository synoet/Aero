import mongoose,{Schema, Document} from 'mongoose'
import { MongooseService } from '../services/mongoose.service'

const mongo = MongooseService.getInstance().getMongoose();

export interface IAirport extends Document{
  name: string,
  city: string
}
const AirportSchema = new mongoose.Schema({
  name: String,
  city: String,
})
const Airport = mongo.model<IAirport>('Airport', AirportSchema)
export default Airport
