import mongoose from "mongoose";
import { Request, Response } from "express";

import paginator from "../../utils/pagination";
import { getHouseById, getHouses, addNewHouse, updateHouse } from "../../db/models/house/house.model";

// export const httpAddNewHouse = async (req: Request, res: Response) => {
//   const house = req.body;

//   if (family.family_name.trim().length === 0) return res.json(400).json({ error: "family name must be provided !" });

//   const DBRes = await AddNewFamily({ ...family, date_from: dateFrom, date_to: dateTo });
//   if (DBRes) return res.status(200).json(DBRes);
//   return res.status(400).json({ error: "someting went wrong when adding family !" });
// };
