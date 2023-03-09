import { roomModel } from "../model/room.js";
import { userModel } from "../model/userModel.js";

async function saveMessage(username, endPoint, message) {
  const room = await roomModel.findOneAndUpdate(
    { endPoint },
    { $push: { messages: { sender: username, message: message } } }
  );
  console.log(room);
  // room.message({ sender: username, message: message });
}

async function saveSocketId(username, socketId) {
  const user = await userModel.findOneAndUpdate({ username }, { $set: { socketioId: socketId } });
  // user.socketioId.save(socketId);
}
export { saveMessage, saveSocketId };
