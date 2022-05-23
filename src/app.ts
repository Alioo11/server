import express from "express";

import billRoutes from "./route/bill/bill.route";

const app = express();

app.use("/bill", billRoutes);

export default app;
