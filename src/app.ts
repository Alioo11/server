import express from "express";

import billRoutes from "./route/bill/bill.route";
import familyRoute from "./route/family/family.route";

const app = express();
app.use(express.json());

app.use("/bill", billRoutes);
app.use("/family", familyRoute);

export default app;
