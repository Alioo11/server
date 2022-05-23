import { Request, Response } from "express";
import mongoose from "mongoose";

import paginator from "../../utils/pagination";
import { getBills, getBillById } from "../../db/models/bill/bill.model";

export const httpGetAllBills = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const paginationData = paginator(page, limit);
  const billsData = await getBills(paginationData);
  res.status(200).json(billsData);
};

export const httpGetBillById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) return res.status(400).json({ error: "Invalid bill ID !" });

  const bill = await getBillById(id);

  if (bill === null) return res.status(404).json({ error: "Bill not Found !" });

  res.status(200).json(bill);
};
