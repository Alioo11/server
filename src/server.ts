import mongoose from "mongoose";
import http from "http";
import { config } from "dotenv";
import app from "./app";
import path from "path";

import { ApolloServer } from "apollo-server-express";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolvers from "./db/models/index.resolver";
import typeDefs from "./db/models/index.graphql";

// const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
// const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

config();
const PORT = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017/admin-manager-db-test";

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

const apollos = new ApolloServer({
  schema,
});

apollos.start().then((res) => {
  console.log(res);
  apollos.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log("Running GraphQL server...");
  });
});
