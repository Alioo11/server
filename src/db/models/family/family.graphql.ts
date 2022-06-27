import { gql } from "apollo-server-express";

export default gql`
  type Query {
    familys(limit: Float, skip: Float): [Family]
    family(id: ID!): Family
  }

  type Family {
    _id: ID!
    family_name: String
    date_from: String
    date_to: String
    absent_days: [String]
    members_count: Float
    house: House
  }
`;
