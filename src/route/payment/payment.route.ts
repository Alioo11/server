import express from "express";

import { httpAddNewPayment, httpGetAllPayments, httpGetPaymentById } from "./payment.controller";

const paymentRouter = express.Router();

paymentRouter.get("/", httpGetAllPayments);

paymentRouter.get("/:id", httpGetPaymentById);

paymentRouter.post("/", httpAddNewPayment);

//paymentRouter.patch("/", httpUpdatePayment);

export default paymentRouter;
