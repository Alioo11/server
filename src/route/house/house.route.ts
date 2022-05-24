import express from "express";

import { httpAddNewHouse, httpGetAllHouses, httpGetHouseById } from "./house.controller";

const houseRouter = express.Router();

houseRouter.get("/", httpGetAllHouses);
houseRouter.get("/:id", httpGetHouseById);

houseRouter.post("/", httpAddNewHouse);
// houseRouter.patch("/", httpUpdateHouse);

export default houseRouter;
