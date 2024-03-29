import { log } from "console";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
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
import { allroutes } from "./routes/routes.js";
import createHttpError from "http-errors";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
// import { connected } from "process";
import { ws } from "./utils/socketinit.js";
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
    // this.creatSoketIoServer();
    this.DataBaseConnect(this.#address);
    this.router();
    // this.errorHandler();
  }
  serverConfig() {
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname + "/.." + "/public")));
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
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
      });
      await apolloServer.start();
      app.use(graphqlUploadExpress());
      apolloServer.applyMiddleware({ app, path: "/graphql" });
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
      // const server = http.createServer(app).listen(port, (error) => {
      //   if (!error) return console.log("server is up in port 3500");
      //   console.log(error);
      // });
      this.creatSoketIoServer(server);
    } catch (error) {
      log(error);
    }
  }
  creatSoketIoServer(server) {
    try {
      const io = new Server(server, {
        cors: {
          origin: "*",
        },
        serveClient: true,
      });
      ws(io);
      // io.on("connection", (socket) => {
      //   console.log(`⚡: ${socket.id} user just connected!`);
      //   socket.on("disconnect", () => {
      //     console.log("🔥: A user disconnected");
      //   });
      // });
    } catch (error) {}
  }
  router() {
    app.use(allroutes);
  }
  errorHandler() {
    app.use((req, res, next) => {
      next(createHttpError.NotFound("your page is not found Error-404"));
    });
    app.use((error, req, res, next) => {
      const serverError = createHttpError.InternalServerError();
      const statusCode = error.status | serverError.status | 500;
      const message = error.message | serverError.message | "internal server Error";
      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
}
export { application };
