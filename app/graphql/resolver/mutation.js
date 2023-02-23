import { nameSpaceModel } from "../../model/nameSpace.js";
import { roomModel } from "../../model/room.js";
import { userModel } from "../../model/userModel.js";
import { userValidationSchema } from "../../validation/userValidation.js";

export const Mutation = {
  createUser: async (parent, arg) => {
    const validate = userValidationSchema.validate({ ...arg });
    // console.log(validate);
    // console.log(arg);
    if (validate.error) {
      const error = validate.error;
      console.log(error);
      return { message: error };
    }
    const user = await userModel.create({ ...arg });

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
