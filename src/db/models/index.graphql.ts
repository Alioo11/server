import { gql } from "apollo-server-express";

import payment from "./payment/payment.graphql";
import family from "./family/family.graphql";
import house from "./house/house.graphql";
import bill from "./bill/bill.graphql";

const Query = gql`
  input Pagination {
    page: Int
    limit: Int
  }
`;

export default [Query, payment, family, house, bill];
