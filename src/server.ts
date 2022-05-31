import mongoose from "mongoose";
import http from "http";
import { config } from "dotenv";

import app from "./app";

console.log = function () {};

config();
const PORT = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || "";

//TODO change the mongo DB defaul options
mongoose.connect(mongo_url);

mongoose.connection.once("open", () => {
  console.log("\x1b[36m", "mongodb connected successfuly");
});

mongoose.connection.on("error", (e) => {
  console.log("\x1b[31m", "mongodb connection error");
  console.error(e);
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
