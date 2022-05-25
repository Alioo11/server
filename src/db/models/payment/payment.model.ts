import { Payment } from "../../interfaces/payment.interface";
import paymentMongoose from "./payment.mongoose";

export const getPayments = async (paginationData: { skip: number; limit: number }) => {
  return await paymentMongoose.find({}).skip(paginationData.skip).limit(paginationData.limit);
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
  console.log("adding a new payment with");
  console.log(payment);
  return await paymentMongoose.create(payment);
};

export const updatePayment = async (_id: number, newPayment: Payment) => {
  paymentMongoose.findByIdAndUpdate(_id, newPayment, { upsert: true }, (err, doc) => {
    if (err) return err;
    return doc;
  });
};
