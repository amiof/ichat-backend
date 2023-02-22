import { nameSpaceModel } from "../../model/nameSpace.js";
import { roomModel } from "../../model/room.js";
import { userModel } from "../../model/userModel.js";
export let Query = {
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
};
