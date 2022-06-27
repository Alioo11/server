import { gql } from "apollo-server-express";

export default gql`
  type Query {
    houses: [House]
    house(id: ID!): House
  }

  type House {
    _id: ID!
    area: Float
    is_empty: Boolean
    unit_name: Float
  }
`;
