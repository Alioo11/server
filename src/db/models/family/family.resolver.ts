import { getHouseById } from "../house/house.model";
import { getFamilies, getFamilyById } from "./family.model";

export default {
  Query: {
    familys: async (_: any, args: any) => {
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
  },
};
