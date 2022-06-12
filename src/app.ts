import express from "express";
const cors = require("cors");

import billRoutes from "./route/bill/bill.route";
import familyRoute from "./route/family/family.route";
import houseRouter from "./route/house/house.route";
import paymentRouter from "./route/payment/payment.route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", express.static("public"));

app.use("/bill", billRoutes);
app.use("/family", familyRoute);
app.use("/house", houseRouter);
app.use("/payment", paymentRouter);

export default app;
