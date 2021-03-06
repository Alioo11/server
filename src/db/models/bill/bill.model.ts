import mongoose from "mongoose";

import billMongoose from "./bill.mongoose";

import paymentMongoose from "../payment/payment.mongoose";

import { billTypes, Bill } from "../../interfaces/bill.interface";

const billSample = {
  date_from: new Date(),
  date_to: new Date(),
  issue_date: new Date(),
  dead_line_date: new Date(),
  is_paid: false,
  type: billTypes.power,
  bill_id: "fang",
  main_price: 598487,
  tax: 9159,
  previus_debt_price: 25,
  consumtion_amount: 152544,
  discount: 4568,
};

export const addMockData = async () => {
  console.log("adding mock data ", billSample);
  const data = await addNewBill(billSample);
  console.log(data);
};

export const getBills = async (paginationData: { skip: number; limit: number }) => {
  return await billMongoose.find({}).skip(paginationData.skip).limit(paginationData.limit);
};

export const getBillById = async (id: String) => {
  try {
    return await billMongoose.findById(id);
  } catch (err) {
    console.log("\x1b[31m", "MongoDb Error : something went wrong while finding Bill By Id");
    console.error(err);
    return null;
  }
};

export const changeBillPaymentStatus = async (id: String, status: boolean) => {
  try {
    return await billMongoose.findByIdAndUpdate(id, { is_paid: status });
  } catch (err) {
    console.log(err);
  }
};

export const addNewBill = async (bill: Bill) => {
  return await billMongoose.create(bill);
};

export const deleteBill = async (id: String) => {
  const relatedPayments = await paymentMongoose.deleteMany({ bill: id });
  const billDeleteData = await billMongoose.findByIdAndDelete(id);
};
