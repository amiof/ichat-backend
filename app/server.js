import { log } from "console";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

class application {
  #port;
  #address;
  constructor(PORT, ADDRESS) {
    this.#port = PORT;
    this.#address = ADDRESS;
    this.serverConfig();
    this.createServer(this.#port);
    this.DataBaseConnect(this.#address);
    this.router();
    this.errorHandler();
  }
  serverConfig() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.static(path.join(__dirname + ".." + "public")));
    app.use(cors());
  }
  DataBaseConnect(address) {
    mongoose.set("strictQuery", false);
    console.log(address);
    mongoose.connect(address, (error) => {
      if (!error) return log("server connected in database ");
      return log(error);
    });
  }

  createServer(port) {
    const server = http.createServer(app);
    server.listen(port, (error) => {
      if (!error) return log("server is up in http://localhost:3500");
      return log(error);
    });
  }
  router() {
    app.get("/", (req, res, next) => {
      res.json({
        message: "hi there",
      });
    });
  }
  errorHandler() {}
}
export { application };
