import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
    otp: { type: String },
    otp_timestamp: { type: Number },
    created_at: { type: Date },
  },
  { versionKey: false }
);

export const userModel = mongoose.model("users", userSchema);
