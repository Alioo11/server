import { Request, Response } from "express";

import paginator from "../../utils/pagination";
import { getBills } from "../../db/models/bill/bill.model";

export const getAllBills = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const paginationData = paginator(page, limit);
  const billsData = await getBills(paginationData);
  res.status(200).json(billsData);
};
