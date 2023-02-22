import mongoose from "mongoose";
import { namespaceSchema } from "./nameSpace";
import { roomSchema } from "./room";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    rooms: { type: [roomSchema], default: [] },
    namespace: { type: [namespaceSchema], defulet: [] },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

export { userModel };
