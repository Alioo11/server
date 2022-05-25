import mongoose from "mongoose";
import { Request, Response } from "express";

import paginator from "../../utils/pagination";
import { addNewPayment, getPaymentById, getPayments, updatePayment } from "../../db/models/payment/payment.model";

export const httpGetAllPayments = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const paginationData = paginator(page, limit);
  const payment = await getPayments(paginationData);
  res.status(200).json(payment);
};

export const httpGetPaymentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) return res.status(400).json({ error: "Invalid payment ID !" });

  const payment = await getPaymentById(id);
  if (payment === null) return res.status(404).json({ error: "Payment not Found !" });

  res.status(200).json(payment);
};

export const httpAddNewPayment = async (req: Request, res: Response) => {
  const { family, bill, amount_paid, ...rest } = req.body;

  if (isNaN(amount_paid)) return res.status(400).json({ error: "invalid payment amount !" });

  const isValidFamilyId = mongoose.Types.ObjectId.isValid(family);
  if (!isValidFamilyId) return res.status(400).json({ error: "Invalid Family ID !" });

  const isValidBillId = mongoose.Types.ObjectId.isValid(bill);
  if (!isValidBillId) return res.status(400).json({ error: "Invalid Bill ID !" });

  const DBRes = await addNewPayment({ ...rest, bill, amount_paid, family });
  if (DBRes) return res.status(200).json(DBRes);
  return res.status(400).json({ error: "someting went wrong when adding family !" });
};
