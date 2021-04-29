import mongoose from "mongoose";
import { MongooseService } from "../services/mongoose.service";
const StaffPhoneNumberSchema = new mongoose.Schema({
  username: String,
  phone_number: Number,
});
const StaffPhoneNumber = MongooseService.getInstance()
  .getMongoose()
  .model("StaffPhoneNumber", StaffPhoneNumberSchema);
export default StaffPhoneNumber;
