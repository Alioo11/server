import { getHouseById } from "../house/house.model";
import { getFamilies, getFamilyById } from "./family.model";
import { getPaymentById } from "../payment/payment.model";

export default {
  Query: {
    familys: async (_: any, { pagination, ...args }: any) => {
      console.log(pagination);
      const family = await getFamilies(args);
      return family;
    },
    family: async (parent: any, args: any) => {
      const family = await getFamilyById(args.id);
      return family;
    },
  },
  Family: {
    house: async (parent: any) => {
      const houseID: String = parent.house;
      return await getHouseById(houseID);
    },
    payment: async (parent: any, args: any) => {
      const paymentIds = parent.payment;
      const payments = [];
      for (let i = 0; i < paymentIds.length; i++) {
        const paymentStr = paymentIds[i] as String;
        const payment = await getPaymentById(paymentStr);
        payments.push(payment);
      }

      return payments;
      // const houses
      // return await getPayments();
    },
  },
};
