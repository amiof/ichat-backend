import { gql } from "apollo-server-express";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

const typeDefs = gql`
  type Query {
    data: String
    nameSpaces(id: ID, name: String): [nameSpace]
    rooms(id: ID, name: String, endPoint: String): [room]
    users(username: String, id: ID, phoneNumber: String, password: String): [user]
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
    rooms: [room]
    pic: String
    nameSpace: [nameSpace]
    phoneNumber: String
    token: String
    refreshToken: String
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
  scalar Upload
  type fieldUpload {
    url: String
  }

  # #-------------- mutations queries

  type Mutation {
    createUser(username: String, password: String, phoneNumber: String): [user]
    createNamespace(name: String, title: String): nameSpace
    createRoom(name: String, title: String, endPoint: String, description: String): room
    addUserInRoom(username: String, endPoint: String): user
    addPhoto(file: Upload!): fieldUpload
  }
`;
export default typeDefs;
