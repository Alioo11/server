import express from "express";

const billRoutes = express.Router();

billRoutes.get("/"); //TODO create a route to get all the bills
billRoutes.post("/"); //TODO create a route to post a new bill to the data base

export default billRoutes;
