import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  user_id: { type: String, ref: "users" },
});

export const testModel = mongoose.model("tests", testSchema);
