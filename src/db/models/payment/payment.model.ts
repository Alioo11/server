import { Payment } from "../../interfaces/payment.interface";
import paymentMongoose from "./payment.mongoose";

import { getFamilyById } from "../../models/family/family.model";
import { getBillById } from "../bill/bill.model";

import familyMongoose from "../family/family.mongoose";

export const getPayments = async (paginationData: { skip: number; limit: number }, familyId: any) => {
  if (familyId) {
    return await paymentMongoose.find({ family: familyId }).skip(paginationData.skip).limit(paginationData.limit);
  } else {
    return await paymentMongoose.find({}).skip(paginationData.skip).limit(paginationData.limit);
  }
};

export const getPaymentById = async (id: String) => {
  try {
    return await paymentMongoose.findById(id);
  } catch (err) {
    console.log("\x1b[31m", "MongoDb Error : something went wrong while finding payment By Id");
    console.error(err);
    return null;
  }
};

export const addNewPayment = async (payment: Payment) => {
  try {
    return await paymentMongoose.create(payment);
  } catch (err) {
    console.log("\x1b[31m", "ERR: some error while adding payment");
    console.log(err);
  }
};

export const updateWithBill = async (payment: Payment) => {
  return await paymentMongoose.findOneAndUpdate({ bill: payment.bill }, payment);
};

export const updatePayment = async (_id: number, newPayment: Payment) => {
  paymentMongoose.findByIdAndUpdate(_id, newPayment, { upsert: true }, (err, doc) => {
    if (err) return err;
    return doc;
  });
};

export const getFullPayment = async () => {
  let initialRes = await paymentMongoose.find({});
  const finalData = [];
  for (let i = 0; i < initialRes.length; i++) {
    const fullFamily = await getFamilyById(initialRes[i].family);
    const fullBill = await getBillById(initialRes[i].bill);
    //initialRes[i].family = fullFamily;
    finalData.push({ ...initialRes[i]._doc, family: fullFamily, bill: fullBill });
  }
  console.log(finalData);

  return finalData;
};

export const changeBillStatus = async (paymentId: string, status: boolean = true) => {
  const res = await paymentMongoose.findByIdAndUpdate(paymentId, { is_paid: status });
  return res;
};
