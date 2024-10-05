import mongoose from "mongoose";
import { APP } from "../variables/constants";

export const connectToDatabase = async () => {
  try{
    await mongoose.connect(APP.DATABASE_URL);
    console.log("Connected to database");
  }
  catch(error){
    throw error;
  }
}