import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    data: String
    nameSpaces: [nameSpace]
    rooms: [room]
    users(username: String, id: ID, phoneNumber: String): [user]
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
  type BaseError {
    message: String!
  }

  type InvalidInputError {
    message: String!
  }

  type NotFoundError {
    message: String!
  }

  type UnknownError {
    message: String!
  }

  type NotAllowedError {
    message: String!
  }
  # union userOrError = user | NotFoundError | NotAllowedError | InvalidInputError | UnknownError
  # union userOrError = user | NotFoundError

  # #-------------- mutations queries

  type Mutation {
    createUser(username: String, password: String, phoneNumber: String): user
    createNamespace(name: String, title: String): nameSpace
    createRoom(name: String, title: String, endPoint: String, description: String): room
  }
`;
export default typeDefs;
