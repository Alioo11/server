import express from "express";

import { addMockData, getData } from "../../db/models/bill/bill.model";
import { getAllBills } from "./bill.controller";

const billRoutes = express.Router();

billRoutes.get("/", getAllBills); //TODO add pagination to the get all the bills route
// billRoutes.get("/", getBillById); //TODO getting bills by their ID
// billRoutes.post('/' , addNewBill) ; //TODO adding a new bill to DB
// billRoutes.post('/' , updateNewbill) ; //TODO update a bill data

billRoutes.get("/fang", addMockData);

export default billRoutes;
