import { gql } from "apollo-server-express";

export default gql`
  type Query {
    bills(limit: Float, skip: Float): [Bill]
    bill(id: ID!): Bill
  }

  type Bill {
    _id: ID!
    date_from: String!
    date_to: String!
    issue_date: String!
    dead_line_date: String!
    is_paid: Boolean!
    type: String!
    bill_id: String!
    main_price: Float!
    tax: Float!
    previus_debt_price: Float!
    consumtion_amount: Float!
    discount: Float!
  }
`;
