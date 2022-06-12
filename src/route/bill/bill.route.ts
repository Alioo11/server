import express from "express";

import { addMockData } from "../../db/models/bill/bill.model";
import { httpGetAllBills, httpGetBillById, httpAddNewBill, httpUpdateBill, httpDeleteBill } from "./bill.controller";

const billRoutes = express.Router();

billRoutes.get("/", httpGetAllBills);
billRoutes.get("/:id", httpGetBillById);
billRoutes.post("/", httpAddNewBill);

billRoutes.delete("/", httpDeleteBill);

billRoutes.patch("/", httpUpdateBill);

billRoutes.get("/fang", addMockData);

export default billRoutes;
