import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  user_id: { type: String, ref: "users" },
  test_array: { type: Array },
});

testSchema.index({user_id: 1});

export const testModel = mongoose.model("tests", testSchema);