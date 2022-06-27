import { gql } from "apollo-server-express";

export default gql`
  type Query {
    payments(limit: Float, skip: Float): [Payment]
    payment(id: ID!): Payment
  }

  type Payment {
    _id: ID!
    description: String!
    amount_paid: Float!
    date_from: String!
    date_to: String!
    is_paid: Boolean!
    family: Family
    bill: Bill
  }
`;
