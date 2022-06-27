import express from "express";
const cors = require("cors");

import path from "path";
import billRoutes from "./route/bill/bill.route";
import familyRoute from "./route/family/family.route";
import houseRouter from "./route/house/house.route";
import paymentRouter from "./route/payment/payment.route";

import { ApolloServer } from "apollo-server-express";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/bill", billRoutes);
app.use("/family", familyRoute);
app.use("/house", houseRouter);
app.use("/payment", paymentRouter);

export default app;
