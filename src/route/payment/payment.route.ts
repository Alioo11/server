import express from "express";

import { httpAddNewPayment, httpGetAllPayments, httpGetPaymentById, httpGetFullPayment, httpPayBill } from "./payment.controller";

const paymentRouter = express.Router();

paymentRouter.get("/", httpGetAllPayments);

paymentRouter.get("/fullData", httpGetFullPayment);

paymentRouter.get("/:id", httpGetPaymentById);

paymentRouter.post("/", httpAddNewPayment);

paymentRouter.post("/pay", httpPayBill);

//paymentRouter.patch("/", httpUpdatePayment);

export default paymentRouter;
