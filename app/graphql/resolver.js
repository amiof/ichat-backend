import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { Mutation } from "./resolver/mutation.js";
import { Query } from "./resolver/query.js";
export const resolvers = {
  //Qureries
  // userOrError: {
  //   __resolveType(obj) {
  //     if (obj.message) {
  //       return "NotFoundError";
  //     }
  //     if (obj.id) {
  //       return "user";
  //     }
  //     return null;
  //   },
  // },
  Upload: GraphQLUpload,
  Query: Query,
  Mutation: Mutation,
};
