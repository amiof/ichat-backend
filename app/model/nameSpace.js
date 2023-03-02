import mongoose from "mongoose";

const namespaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pic: { type: String, default: "http://localhost:3500/pic/egg.webp" },
    title: { type: String, required: true },
    rooms: { type: [mongoose.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);
const nameSpaceModel = mongoose.model("nameSpace", namespaceSchema);

export { nameSpaceModel, namespaceSchema };
