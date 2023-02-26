import { UserInputError } from "apollo-server-express";
import { nameSpaceModel } from "../../model/nameSpace.js";
import { roomModel } from "../../model/room.js";
import { userModel } from "../../model/userModel.js";
import { checkAvailableInDataBase, createToken, hashData } from "../../utils/utils.js";
import { userValidationSchema } from "../../validation/userValidation.js";

export const Mutation = {
  createUser: async (parent, arg) => {
    const { value, error } = userValidationSchema.validate({ ...arg }, { abortEarly: false });
    const { username, password, phoneNumber } = value;
    if (error) {
      throw new UserInputError("INPUT ERROR", {
        validationError: error.details,
      });
    }
    const checkuserName = await checkAvailableInDataBase({ username }, userModel);
    const checkPhoneNumber = await checkAvailableInDataBase({ phoneNumber }, userModel);

    if (checkuserName.username > 0 || checkPhoneNumber.length > 0) {
      throw new UserInputError("this username or phoneNumber is available");
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
    return user;
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
    const checkUsername = await checkAvailableInDataBase({ username }, userModel);
    const checkEndPoint = await checkAvailableInDataBase({ endPoint }, roomModel);

    if (checkUsername && checkEndPoint) {
      const test = checkUsername[0].rooms[0]?.name
        ? [...checkUsername[0].rooms, ...checkEndPoint]
        : checkEndPoint;
      const updateUser = await userModel.updateOne({ username }, { $set: { rooms: test } });

      const user = await checkAvailableInDataBase({ username }, userModel);

      return user[0];
    }
    return new UserInputError("input Error");
  },
};
