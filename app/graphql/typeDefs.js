import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    data: String
  }
  type Mutation {
    data: String
  }
`;
export default typeDefs;
