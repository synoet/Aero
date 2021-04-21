import mongoose, {Schema, Document} from 'mongoose'
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface IUser extends Document {
    _id: string;
    email: string;
    type: string;
}

const UserSchema: Schema = new mongoose.Schema({
    _id: String,
    email: String,
    type: String,
})

const User = mongo.model<IUser>('User', UserSchema);

export default User;