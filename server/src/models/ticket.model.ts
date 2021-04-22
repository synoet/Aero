import mongoose, {Schema, Document} from 'mongoose'
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface ITicket extends Document {
    ticket_id: string,
    email: string,
    flight_number: number
}

const TicketSchema = new mongoose.Schema({
    ticket_id: String,
    email: String,
    flight_number: Number

});
const Ticket = mongo.model<ITicket>('Ticket', TicketSchema);
export default Ticket;