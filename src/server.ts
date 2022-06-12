import mongoose from "mongoose";
import http from "http";
import { config } from "dotenv";

import app from "./app";

config();
const PORT = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017/admin-manager-db-test";

//TODO change the mongo DB defaul options

mongoose
  .connect(mongo_url)
  .then((res) => {
    console.log("\x1b[36m", "mongodb connected successfuly");
    console.log(res);
  })
  .catch((err) => {
    console.log("\x1b[31m", "mongodb connection error");
    console.error(err);
  });

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
