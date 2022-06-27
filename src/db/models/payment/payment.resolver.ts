import { getBillById } from "../bill/bill.model";
import { getFamilyById } from "../family/family.model";
import { getPayments, getPaymentById } from "./payment.model";

export default {
  Query: {
    payments: async (_: any, args: any) => {
      const payments = await getPayments(args, null);
      return payments;
    },
    payment: async (_: any, args: any) => {
      return await getPaymentById(args.id);
    },
  },
  Payment: {
    family: async (parent: any) => {
      return await getFamilyById(parent.family);
    },
    bill: async (parent: any) => {
      return await getBillById(parent.bill);
    },
  },
};
