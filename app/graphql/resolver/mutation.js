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
};
