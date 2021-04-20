import mongoose, {Schema, Document} from 'mongoose';
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface IStaff extends Document{
    _id: string;
    username: string;
    airling_name: string;
    password: string;

}

const StaffSchema: Schema = new mongoose.Schema({
    _id: String,
    username: String,
    airline_name: String,
    password: String

});
const Staff = mongo.model<IStaff>('Staff', StaffSchema);

export default Staff;