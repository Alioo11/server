import houseMongoose from "./house.mongoose";
import { House } from "../../interfaces/house.interface";

export const getHouses = async (paginationData: { skip: number; limit: number }) => {
  return await houseMongoose.find({}).skip(paginationData.skip).limit(paginationData.limit);
};

export const getHouseById = async (id: String) => {
  try {
    return await houseMongoose.findById(id);
  } catch (err) {
    console.log("\x1b[31m", "MongoDb Error : something went wrong while finding House By Id");
    console.error(err);
    return null;
  }
};

export const addNewHouse = async (house: House) => {
  return await houseMongoose.create(house);
};

export const updateHouse = async (_id: number, newHouse: House) => {
  houseMongoose.findByIdAndUpdate(_id, newHouse, { upsert: true }, (err, doc) => {
    if (err) return err;
    return doc;
  });
};
