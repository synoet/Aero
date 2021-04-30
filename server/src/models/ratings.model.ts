import mongoose, {Schema, Document} from 'mongoose';
import {MongooseService} from '../services/mongoose.service';

const mongo = MongooseService.getInstance().getMongoose();

export interface IRating extends Document{
    customer_email: string,
    commentary: string,
    ratings: number

}

const RatingsSchema: Schema = new mongoose.Schema({
    customer_email: String,
    commentary: String,
    ratings: Number

});
const Ratings = mongo.model<IRating>('Ratings', RatingsSchema);
export default Ratings;