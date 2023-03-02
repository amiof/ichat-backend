import mongoose from "mongoose";
import { namespaceSchema } from "./nameSpace.js";
import { roomSchema } from "./room.js";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pic: { type: String, default: "http://localhost:3500/pic/eeg.webp" },
    rooms: { type: [roomSchema], default: [] },
    namespace: { type: [namespaceSchema], default: [] },
    token: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

export { userModel };
