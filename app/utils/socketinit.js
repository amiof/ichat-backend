import { saveMessage, saveSocketId } from "./utilsSocketIO.js";
import util from "util";
class socketHandler {
  #io;
  constructor(io) {
    this.#io = io;
  }
  socketInit(io) {
    this.#io.on("connection", (socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);
      // console.log(`${socket}`);
      const socketId = socket.id;
      socket.on("message", (msg) => {
        saveMessage(msg[0], msg[1], msg[2]);
        // console.log(util.inspect(msg, true, null, true));
        saveSocketId(msg[0], socketId);
      });
      socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
      });
    });
  }
}
function ws(io) {
  new socketHandler(io).socketInit();
}
export { ws };
