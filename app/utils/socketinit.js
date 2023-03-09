class socketHandler {
  #io;
  constructor(io) {
    this.#io = io;
  }
  socketInit(io) {
    this.#io.on("connection", (socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);
      console.log(`${socket}`);
      socket.on("message", (msg) => {
        console.log();
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
