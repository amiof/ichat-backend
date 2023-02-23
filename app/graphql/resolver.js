import { Mutation } from "./resolver/mutation.js";
import { Query } from "./resolver/query.js";
export const resolvers = {
  //Qureries
  userOrError: {
    __resolveType(obj) {
      if (obj.message) {
        return "NotFoundError";
      }
      if (obj.id) {
        return "user";
      }
      return null;
    },
  },
  Query: Query,
  Mutation: Mutation,
};
