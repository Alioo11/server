import { Request, Response } from "express";
import mongoose from "mongoose";

import { calculatewater } from "../../Functions/water/water";
import { calculatePower } from "../../Functions/power/power";
import { calculateGas } from "../../Functions/gas/gas";

import paginator from "../../utils/pagination";
import { getBills, getBillById, addNewBill } from "../../db/models/bill/bill.model";

import { addNewPayment } from "../../db/models/payment/payment.model";

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

export const httpAddNewBill = async (req: Request, res: Response) => {
  const bill = req.body;

  const dateFrom: any = new Date(bill.date_from);
  const dateTo: any = new Date(bill.date_to);
  const issueDate: any = new Date(bill.issue_date);
  const deadLineDate: any = new Date(bill.dead_line_date);

  if (isNaN(dateFrom) || isNaN(dateTo) || isNaN(issueDate) || isNaN(deadLineDate)) return res.status(400).json({ error: "invalid Date" });
  const billType = req.body.type.trim();
  if (billType !== "power" && billType !== "water" && billType !== "gas") return res.status(400).json({ error: "invalid bill type" });

  const dbRes = await addNewBill({ ...bill, date_from: dateFrom, date_to: dateTo, issue_date: issueDate, dead_line_date: deadLineDate });

  let paymentData;

  switch (billType) {
    case "water": {
      paymentData = await calculatewater(dbRes);
      break;
    }
    case "gas": {
      paymentData = await calculateGas(dbRes);
      break;
    }
    case "power": {
      paymentData = await calculatePower(dbRes);
      break;
    }
    default: {
      paymentData = await calculatewater(dbRes);
    }
  }

  paymentData.forEach(async (item: any) => {
    await addNewPayment(item);
  });

  if (dbRes) return res.status(200).json(dbRes);
  return res.status(400).json({ error: "something went wrong !" });
};
