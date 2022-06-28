import familyMongoose from "./family.mongoose";
import { Family } from "../../interfaces/family.interface";
import mongoose from "mongoose";

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

export const updateFamily = async (_id: number, newFamily: Family) => {
  familyMongoose.findByIdAndUpdate(_id, newFamily, { upsert: true }, (err, doc) => {
    if (err) return err;
    return doc;
  });
};

export const familyPushPayment = async (_id: String, paymentId?: any) => {
  const ObjId = new mongoose.mongo.ObjectId(paymentId);
  const family = await familyMongoose.findById(_id);
  family.payment.push(ObjId);
  family.save();
};
