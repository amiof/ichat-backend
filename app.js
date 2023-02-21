import { application } from "./app/server.js";
const url = "mongodb://localhost:27017/ichatDB";
const port = "3500";
new application(port, url);
