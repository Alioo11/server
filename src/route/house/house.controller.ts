import mongoose from "mongoose";
import { Request, Response } from "express";

import paginator from "../../utils/pagination";
import { getHouseById, getHouses, addNewHouse, updateHouse } from "../../db/models/house/house.model";

export const httpGetHouseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) return res.status(400).json({ error: "Invalid House ID !" });

  const house = await getHouseById(id);
  if (house === null) return res.status(404).json({ error: "House not Found !" });

  res.status(200).json(house);
};

export const httpGetAllHouses = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const paginationData = paginator(page, limit);
  const houses = await getHouses(paginationData);
  res.status(200).json(houses);
};

export const httpAddNewHouse = async (req: Request, res: Response) => {
  const house = req.body;

  if (isNaN(house.unit_name)) return res.status(400).json({ error: "invalid unit-name" });

  const DBRes = await addNewHouse(house);
  if (DBRes) return res.status(200).json(DBRes);
  return res.status(400).json({ error: "someting went wrong when adding family !" });
};
