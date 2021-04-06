import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const TicketSchema = new mongoose.Schema({
    ticket_id: String,
    email: String,
    flight_number: Number

});
const Ticket = MongooseService.getInstance().getMongoose().model('Ticket', TicketSchema);
export default Ticket;