import mongoose from "mongoose";
import { APP } from "../variables/constants";
import { getErrorMessage } from "../services/functions";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(APP.DATABASE_URL);
    console.log("Connected to database");
  } catch (error: unknown) {
    console.log(getErrorMessage(error));
  }
};
