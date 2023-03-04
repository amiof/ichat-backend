import mongoose from "mongoose";
import { messageSchema } from "./message.js";
const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pic: { type: String, default: "http://localhost:3500/pic/roomEgg.webp" },
    title: { type: String, required: true },
    endPoint: { type: String, required: true },
    description: { type: String, default: "no description" },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true }
);
const roomModel = mongoose.model("roomModel", roomSchema);

export { roomModel, roomSchema };
