import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Types.ObjectId, required: true },
    message: { type: String, required: true },
    dateTime: { type: String, required: true },
  },
  { timestamps: true }
);
const messageModel = mongoose.model("message", messageSchema);

export { messageModel, messageSchema };
