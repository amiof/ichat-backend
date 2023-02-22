import mongoose from "mongoose";
import { messageSchema } from "./message.js";
const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pic: { type: String, required: true },
    title: { type: String, required: true },
    endPonit: { type: String, required: true },
    description: { type: String },
    message: { type: [messageSchema], default: [] },
  },
  { timestamps: true }
);
const roomModel = mongoose.model("roomModel", roomSchema);

export { roomModel, roomSchema };
