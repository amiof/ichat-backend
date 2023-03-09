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
async function saveSocketId(userId, socketId) {
  const user = await userModel.findOneAndUpdate(
    { _id: userId.toString() },
    { $set: { socketioID: socketId } }
  );
  console.log(user, socketId);
  if (user) {
    return user;
    console.log(user);
  }
  return false;
  // user.socketioId.save(socketId);
}
export { saveMessage, saveSocketId };
