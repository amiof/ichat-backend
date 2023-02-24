import { log } from "console";
import { ApolloServer } from "apollo-server-express";
import express from "express";
// import http from "http";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { resolvers } from "./graphql/resolver.js";
import typeDefs from "./graphql/typeDefs.js";
import { Server } from "socket.io";
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
    this.apolloServerCreate();
    this.createServer(this.#port);
    this.creatSoketIoServer();
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
    mongoose.connect(address, (error) => {
      if (!error) return log("server connected in database ");
      return log(error);
    });
  }
  async apolloServerCreate() {
    try {
      const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        resolverValidationOptions: { requireResolversForResolveType: false },
      });
      await apolloServer.start();
      apolloServer.applyMiddleware({ app });
    } catch (error) {
      log(error);
    }
  }
  createServer(port) {
    try {
      const server = app.listen({ port }, (error) => {
        if (!error) return log("server is up in http://localhost:3500");
        return log(error);
      });
      return server;
    } catch (error) {
      log(error);
    }
  }
  creatSoketIoServer() {
    try {
      const server = this.createServer();
      const io = new Server(server, {
        cors: {
          origin: "*",
        },
        serveClient: true,
      });
    } catch (error) {}
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
