import mongoose from "mongoose";
import { Request, Response } from "express";

import paginator from "../../utils/pagination";

import { getHouseById } from "../../db/models/house/house.model";
import { getPaymentById } from "../../db/models/payment/payment.model";

import { AddNewFamily, getFamilies, getFamilyById, updateFamily } from "../../db/models/family/family.model";

export const httpGetFamilyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) return res.status(400).json({ error: "Invalid Family ID !" });

  const family = await getFamilyById(id);
  if (family === null) return res.status(404).json({ error: "family not Found !" });

  const { house, payment } = family;

  const housedata = await getHouseById(house);
  const paymentArray = [];
  for (let i = 0; i < payment.length; i++) {
    const paymentData = await getPaymentById(payment[i]);
    paymentArray.push(paymentData._doc);
  }

  res.status(200).json({ ...family._doc, house: housedata, payment: paymentArray });
};

export const httpGetAllFamilies = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const paginationData = paginator(page, limit);
  let familiesData = await getFamilies(paginationData);
  const finalData = [];
  for (let i = 0; i < familiesData.length; i++) {
    const { house } = familiesData[i];
    const houseData = await getHouseById(house);
    finalData.push({ ...familiesData[i]._doc, house: houseData._doc });
  }
  res.status(200).json(finalData);
};

export const httpUpdateFamily = async (req: Request, res: Response) => {
  const { _id, house, absent_days, ...rest } = req.body;

  const isValidHouse = mongoose.Types.ObjectId.isValid(house);
  if (house && !isValidHouse) return res.status(400).json({ error: "Invalid House ID !" });

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

  const updateResult = await updateFamily(_id, { ...rest, house, absent_days: absentDays });

  if (updateResult !== undefined) return res.status(500).json(updateResult);

  res.status(200).json({ massage: "family successfuly updated !!" });
};

export const httpAddNewFamily = async (req: Request, res: Response) => {
  const family = req.body;

  const isValidHouse = mongoose.Types.ObjectId.isValid(family.house);
  if (!isValidHouse) return res.status(400).json({ error: "Invalid House ID !" });

  const dateFrom: any = new Date(family.date_from);
  const dateTo: any = family.date_to ? new Date(family.date_to) : null;

  if (!family.date_from || !family.family_name || !family.members_count) {
    return res.status(400).json({ error: "missing property !" });
  }
  if (isNaN(dateFrom)) return res.status(400).json({ error: "invalid Date !" });
  if (family.family_name.trim().length === 0) return res.json(400).json({ error: "family name must be provided !" });

  const DBRes = await AddNewFamily({ ...family, date_from: dateFrom, date_to: dateTo });
  if (DBRes) return res.status(200).json(DBRes);
  return res.status(400).json({ error: "someting went wrong when adding family !" });
};
