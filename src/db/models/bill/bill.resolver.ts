import { gql } from "apollo-server-express";
import { getBillById, getBills } from "./bill.model";

export default {
  Query: {
    bill: async (_: any, args: any) => {
      const bill = await getBillById(args.id);
      return bill;
    },
    bills: async (_: any, args: any) => {
      const bills = await getBills(args);
      return bills;
    },
  },
};
