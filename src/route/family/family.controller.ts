import mongoose from "mongoose";
import { Request, Response } from "express";

import paginator from "../../utils/pagination";
import { AddNewFamily, getFamilies, getFamilyById, updateFamily } from "../../db/models/family/family.model";

export const httpGetFamilyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) return res.status(400).json({ error: "Invalid Family ID !" });

  const family = await getFamilyById(id);
  if (family === null) return res.status(404).json({ error: "family not Found !" });

  res.status(200).json(family);
};

export const httpGetAllFamilies = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const paginationData = paginator(page, limit);
  const familiesData = await getFamilies(paginationData);
  res.status(200).json(familiesData);
};

export const httpUpdateFamily = async (req: Request, res: Response) => {
  const { _id, absent_days, ...rest } = req.body;
  let absentDays = [];
  if (absent_days && absent_days.length !== 0) {
    const formatedDates = absent_days.map((absent_day: string) => {
      return new Date(absent_day);
    });

    const haveInvalidDate = formatedDates.some((formatedItem: number) => {
      return isNaN(formatedItem);
    });

    if (haveInvalidDate) return res.status(400).json({ error: "absent days contain invelid Date !" });
    absentDays = formatedDates;
  }

  const isValidId = mongoose.Types.ObjectId.isValid(_id);
  if (!isValidId) return res.status(400).json({ error: "Invalid Family ID !" });

  const updateResult = await updateFamily(_id, { ...rest, absent_days: absentDays });

  if (updateResult !== undefined) return res.status(500).json(updateResult);

  res.status(200).json({ massage: "family successfuly updated !!" });
};

export const httpAddNewFamily = async (req: Request, res: Response) => {
  const family = req.body;

  const dateFrom: any = new Date(family.date_from);
  const dateTo: any = new Date(family.date_to);

  if (!family.date_from || !family.date_to || !family.family_name || !family.members_count) {
    return res.status(400).json({ error: "missing property !" });
  }
  if (isNaN(dateFrom) || isNaN(dateTo)) return res.status(400).json({ error: "invalid Date !" });
  if (family.family_name.trim().length === 0) return res.json(400).json({ error: "family name must be provided !" });

  const DBRes = await AddNewFamily({ ...family, date_from: dateFrom, date_to: dateTo });
  if (DBRes) return res.status(200).json(DBRes);
  return res.status(400).json({ error: "someting went wrong when adding family !" });
};
