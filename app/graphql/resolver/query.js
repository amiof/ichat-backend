import { GraphQLError } from "graphql";
import { nameSpaceModel } from "../../model/nameSpace.js";
import { roomModel } from "../../model/room.js";
import { userModel } from "../../model/userModel.js";
import { verifyHashed } from "../../utils/utils.js";
export let Query = {
  data: () => {
    return "hi";
  },
  users: async (parent, arg) => {
    if (arg) {
      // const { password } = arg;
      const user = await userModel.find({ ...arg });
      // console.log(user);
      return user;
    }
    const users = await userModel.find({});
    return users;
  },
  login: async (_, arg) => {
    const { username, password } = arg;
    console.log(username, password);
    if (!username && !password) throw new GraphQLError("import username and password ");
    const user = await userModel.find({ username });
    if (!user) throw new GraphQLError("this username or password is not valid");
    const pass = user[0].password;
    const verify = verifyHashed(password, pass);
    if (!verify) throw new GraphQLError("this username or password is not valid");
    console.log(verify);
    return user;
  },
  nameSpaces: async (parent, arg) => {
    if (arg) {
      const nameSpace = await nameSpaceModel.find({ ...arg });
      return nameSpace;
    }
    const nameSpaces = await nameSpaceModel.find({});
    return nameSpaces;
  },
  rooms: async (_, arg) => {
    if (arg) {
      const room = await roomModel.find({ ...arg });
      return room;
    }
    const rooms = await roomModel.find({});
    return rooms;
  },
};
