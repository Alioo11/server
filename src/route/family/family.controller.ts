import mongoose from "mongoose";
import { Request, Response } from "express";

import paginator from "../../utils/pagination";
import { AddNewFamily, getFamilies, getFamilyById } from "../../db/models/family/family.model";

export const httpAddNewFamily = async (req: Request, res: Response) => {
  const family = req.body;

  const dateFrom: any = new Date(family.date_from);
  const dateTo: any = new Date(family.date_to);

  if (!family.date_from || !family.date_to || !family.unit_name || !family.family_name || !family.members_count) {
    return res.status(400).json({ error: "missing property !" });
  }
  if (isNaN(dateFrom) || isNaN(dateTo)) return res.status(400).json({ error: "invalid Date !" });
  if (isNaN(family.unit_name)) return res.json(400).json({ error: "invalid unit name !" });
  if (family.family_name.trim().length === 0) return res.json(400).json({ error: "family name must be provided !" });

  const DBRes = await AddNewFamily({ ...family, date_from: dateFrom, date_to: dateTo });
  if (DBRes) return res.status(200).json(DBRes);
  return res.status(400).json({ error: "someting went wrong when adding family !" });
};
