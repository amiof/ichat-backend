import { connectionCheck, saveMessage, saveSocketId } from "./utilsSocketIO.js";
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
      socket.on("message", (msg) => {
        saveMessage(msg[0], msg[1], msg[2]);
        // console.log(util.inspect(msg, true, null, true));
      });

      socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
      });
      socket.on("login", async (username) => {
        const socketId = socket.id;
        const user = await saveSocketId(username, socketId);
        if (user.socketioID == socketId) {
          socket.emit("connectToServer", "connected");
        }
      });
      socket.on("connectionCheck", async (username) => {
        const status = connectionCheck(username, socket);
        console.log("username:", username, "status:", await status);
        const socketId = socket.id;
        if ((await status) == "notConnected") {
          const user = await saveSocketId(username, socketId);
        }
      });
    });
  }
}
function ws(io) {
  new socketHandler(io).socketInit();
}
export { ws };
