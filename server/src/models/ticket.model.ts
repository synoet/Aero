import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const ticketSchema = new mongoose.Schema({
    ticket_ID: String,
    email: String,
    flight_Number: Number

});
const Ticket = MongooseService.getInstance().getMongoose().model('Ticket', ticketSchema);
export default Ticket;