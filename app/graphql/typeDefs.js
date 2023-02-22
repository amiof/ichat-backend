import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    data: String
    nameSpaces: [nameSpace]
    rooms: [room]
    users: [user]
  }
  type nameSpace {
    id: ID
    name: String
    pic: String
    title: String
    rooms: [ID]
  }
  type room {
    id: ID
    name: String
    pic: String
    title: String
    endPoint: String
    description: String
    messages: [message]
  }
  type message {
    id: ID
    sender: ID
    message: String
  }
  type user {
    id: ID
    username: String
    password: String
    rooms: [ID]
    nameSpace: [ID]
    phoneNumber: String
  }

  type Mutation {
    data(server: String): String
  }
`;
export default typeDefs;
