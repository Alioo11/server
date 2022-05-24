import express from "express";

import billRoutes from "./route/bill/bill.route";
import familyRoute from "./route/family/family.route";
import houseRouter from "./route/house/house.route";

const app = express();
app.use(express.json());

app.use("/bill", billRoutes);
app.use("/family", familyRoute);
app.use("/house", houseRouter);

export default app;
