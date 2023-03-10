import { messageModel } from "../model/message.js";
import { roomModel } from "../model/room.js";
import { userModel } from "../model/userModel.js";

async function saveMessage(userId, endPoint, message) {
  const room = await roomModel.findOneAndUpdate(
    { endPoint },
    { $push: { messages: { sender: userId, message: message, endPoint } } }
  );
  const messages = await messageModel.create({ sender: userId, message, endPoint });

  // console.log(room);
  // room.message({ sender: username, message: message });
}
async function saveSocketId(username, socketId) {
  const user = await userModel.findOneAndUpdate({ username }, { $set: { socketioID: socketId } });
  if (user) {
    return user;
  }
  return false;
  // user.socketioId.save(socketId);
}
async function connectionCheck(username, socket) {
  const socketId = socket.id;
  const user = await userModel.findOne({ username });

  if (user?.socketioID == socketId) {
    socket.emit("resConnectionCheck", "connected");
    return "connected";
  }
  return "notConnected";
}

export { saveMessage, saveSocketId, connectionCheck };
