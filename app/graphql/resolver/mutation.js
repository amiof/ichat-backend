import { nameSpaceModel } from "../../model/nameSpace.js";
import { GraphQLError } from "graphql";
import { roomModel } from "../../model/room.js";
import { userModel } from "../../model/userModel.js";
import { checkAvailableInDataBase, createToken, hashData } from "../../utils/utils.js";
import { userValidationSchema } from "../../validation/userValidation.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const Mutation = {
  createUser: async (parent, arg) => {
    const { value, error } = userValidationSchema.validate({ ...arg }, { abortEarly: false });
    const { username, password, phoneNumber } = value;
    if (error) {
      throw new GraphQLError("INPUT ERROR", {
        validationError: error.details,
      });
    }
    const checkuserName = await checkAvailableInDataBase({ username }, userModel);
    const checkPhoneNumber = await checkAvailableInDataBase({ phoneNumber }, userModel);

    if (checkuserName.username > 0 || checkPhoneNumber.length > 0) {
      throw new GraphQLError("this username or phoneNumber is available");
    }
    const hashedPass = hashData(password);
    const token = createToken(username, "1d");
    const refreshToken = createToken(username, "365d");
    const user = await userModel.create({
      username,
      password: hashedPass,
      phoneNumber,
      token,
      refreshToken,
    });
    return [user];
  },
  createNamespace: async (_, arg) => {
    console.log(arg);
    const nameSpace = await nameSpaceModel.create({ ...arg });
    return nameSpace;
  },
  createRoom: async (_, arg) => {
    console.log(arg);

    const Room = await roomModel.create({ ...arg });
    return Room;
  },
  addUserInRoom: async (_, arg) => {
    const { username, endPoint } = arg;
    console.log(username, endPoint);
    const checkUsername = await checkAvailableInDataBase({ username }, userModel);
    const checkEndPoint = await checkAvailableInDataBase({ endPoint }, roomModel);
    const checkAddedBefore = await userModel.find({
      username,
      rooms: { $elemMatch: { endPoint } },
    });
    if (checkAddedBefore.length > 0) {
      return new GraphQLError("this user before added to this room");
    }
    if (checkUsername && checkEndPoint) {
      const test = checkUsername[0].rooms[0]?.name
        ? [...checkUsername[0].rooms, ...checkEndPoint]
        : checkEndPoint;
      const updateUser = await userModel.updateOne({ username }, { $set: { rooms: test } });

      const user = await checkAvailableInDataBase({ username }, userModel);

      return user[0];
    }
    return new GraphQLError("input Error");
  },
  addPhoto: async (_, { file }) => {
    const { createReadStream, filename } = await file;
    const location = path.join(__dirname, `../../../public/pic/${filename}`);
    let myfile = createReadStream();
    await myfile.pipe(fs.createWriteStream(location));
    return {
      url: `http:localhost/3500/pic/${filename}`,
    };
  },
};
