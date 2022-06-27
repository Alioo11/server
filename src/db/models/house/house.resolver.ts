import { getHouseById } from "./house.model";

export default {
  Query: {
    house: async (_: any, args: any) => {
      const house = await getHouseById(args.id);
      console.log("found ", house);
      return house;
    },
  },
};
