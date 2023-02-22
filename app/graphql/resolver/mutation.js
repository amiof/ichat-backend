import { nameSpaceModel } from "../../model/nameSpace.js";
import { roomModel } from "../../model/room.js";
import { userModel } from "../../model/userModel.js";

export const Mutation = {
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
  createRoom: async (parent, arg) => {
    console.log(arg);

    const Room = await roomModel.create({ ...arg });
    return Room;
  },
};
