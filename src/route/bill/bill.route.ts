import express from "express";

import { addMockData } from "../../db/models/bill/bill.model";
import { httpGetAllBills, httpGetBillById } from "./bill.controller";

const billRoutes = express.Router();

billRoutes.get("/", httpGetAllBills);
billRoutes.get("/:id", httpGetBillById);
// billRoutes.post('/' , addNewBill) ; //TODO adding a new bill to DB
// billRoutes.post('/' , updateNewbill) ; //TODO update a bill data

billRoutes.get("/fang", addMockData);

export default billRoutes;
