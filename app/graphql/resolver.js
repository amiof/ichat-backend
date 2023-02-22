import { userModel } from "../model/userModel.js";

export const resolvers = {
  //Qureries
  Query: {
    data: () => {
      return "hi";
    },
    users: async () => {
      const users = await userModel.find({});
      return users;
    },
  },
  // Mutations,
  Mutation: {
    data: (parent, arg) => {
      console.log(arg);
      return "mutation hi";
    },
    createUser: async (parent, arg) => {
      console.log(arg);
      const user = await userModel.create({ ...arg });

      return user;
    },
  },
};
