import jwt from "jsonwebtoken";
import { IToken } from "../types/tokenTypes";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string = String(process.env.JWT_SECRET);
const EXP_TIME: string = String(process.env.EXP_TIME);

function createToken(data: object) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: EXP_TIME });
}

function verifyToken(data: string) {
  const verified = jwt.verify(data, JWT_SECRET) as IToken;
  if (!verified) throw { code: "Unauthorized", message: "Invalid Token" };
  return verified;
}

export default {
  createToken,
  verifyToken,
};
