import { nameSpaceModel } from "../model/nameSpace.js";
import { roomModel } from "../model/room.js";
import { userModel } from "../model/userModel.js";

export const resolvers = {
  //Qureries
  Query: {
    data: () => {
      return "hi";
    },
    users: async (parent, arg) => {
      if (arg) {
        const user = await userModel.find({ ...arg });
        return user;
      }
      const users = await userModel.find({});
      return users;
    },
    nameSpaces: async (parent, arg) => {
      if (arg) {
        const nameSpace = await nameSpaceModel.find({ ...arg });
        return nameSpace;
      }
      const nameSpaces = await nameSpaceModel.find({});
      return nameSpaces;
    },
    rooms: async () => {
      const rooms = await roomModel.find({});
      return rooms;
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
    createNamespace: async (parent, arg) => {
      console.log(arg);
      const nameSpace = await nameSpaceModel.create({ ...arg });
      return nameSpace;
    },
  },
};
