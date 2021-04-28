import mongoose, {Schema, Document} from 'mongoose'
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface ITicket extends Document {
    _id: string,
    email: string,
    flight_id: String
}

const TicketSchema: Schema = new mongoose.Schema({
    _id: String,
    email: String,
    flight_id: String

});
const Ticket = mongo.model<ITicket>('Ticket', TicketSchema);
export default Ticket;