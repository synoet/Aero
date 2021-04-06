import mongoose from 'mongoose';
import {MongooseService} from '../services/mongoose.service';
const ratingsSchema = new mongoose.Schema({
    customer_email: String,
    commentary: String,
    ratings: Number

});
const Ratings = MongooseService.getInstance().getMongoose().model('Ratings', ratingsSchema);
export default Ratings;