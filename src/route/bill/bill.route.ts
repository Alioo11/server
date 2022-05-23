import express from "express";

import { addMockData } from "../../db/models/bill/bill.model";
import { httpGetAllBills, httpGetBillById, httpAddNewBill } from "./bill.controller";

const billRoutes = express.Router();

billRoutes.get("/", httpGetAllBills);
billRoutes.get("/:id", httpGetBillById);
billRoutes.post("/", httpAddNewBill);
// billRoutes.post('/' , updateNewbill) ; //TODO update a bill data

billRoutes.get("/fang", addMockData);

export default billRoutes;
