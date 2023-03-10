import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { secretKey } from "../constants.js";
import bcrypt from "bcryptjs";
dotenv.config({ path: "../../.env" });
// dotenv.config()
const createToken = (payload, Exp) => {
  const Token = jwt.sign({ payload }, secretKey, { expiresIn: Exp });

  return Token;
};

async function checkAvailableInDataBase(Data, Model) {
  const data = await Model.find(Data);
  if (!data) return false;
  return data;
}

function hashData(payload) {
  const salt = bcrypt.genSaltSync(10);
  const pass = payload.toString();
  const hashed = bcrypt.hashSync(pass, salt);
  return hashed;
}

function verifyHashed(pass, hashed) {
  const data = bcrypt.compareSync(pass, hashed);
  return data;
}

export { createToken, checkAvailableInDataBase, hashData, verifyHashed };
