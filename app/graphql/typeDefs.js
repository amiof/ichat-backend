import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    data: String
  }
`;
export default typeDefs;
