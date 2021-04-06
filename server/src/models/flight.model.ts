import mongoose from 'mongoose';
const flightSchema = new mongoose.Schema({
    Flight_number: Number,
    Departure_Date: Date,
    Departure_Time: Date, 
    Airline_name: String,
    Arrival_Date: Date,
    Arrival_Time: Date,
    Base_price: Number,
    Airplane_ID: String,
    Status: {
        type: String,
        default : null
    }

});
const Post = mongoose.model('Post', flightSchema);
export default Post;