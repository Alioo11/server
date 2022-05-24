import familyMongoose from "./family.mongoose";
import { Family } from "../../interfaces/family.interface";

export const getFamilies = async (paginationData: { skip: number; limit: number }) => {
  return await familyMongoose.find({}).skip(paginationData.skip).limit(paginationData.limit);
};

export const getFamilyById = async (id: String) => {
  try {
    return await familyMongoose.findById(id);
  } catch (err) {
    console.log("\x1b[31m", "MongoDb Error : something went wrong while finding Family By Id");
    console.error(err);
    return null;
  }
};

export const AddNewFamily = async (family: Family) => {
  return await familyMongoose.create(family);
};
