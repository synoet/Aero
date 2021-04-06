import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const ticketSchema = new mongoose.Schema({

})
const Ticket = MongooseService.getInstance().getMongoose().model('Ticket', ticketSchema);
export default Ticket;