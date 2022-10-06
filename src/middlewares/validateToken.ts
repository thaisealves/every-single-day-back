import { NextFunction, Request, Response } from "express";
import jwt from "../utils/jwt";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw {
      code: "Unauthorized",
      message: "An authorization token must be provided",
    };
  }
  const token: string = authorization.replace("Bearer ", "");
  const verified = jwt.verifyToken(token);

  if (!verified) {
    throw { code: "Unauthorized", message: "You must provide a valide token" };
  }
  res.locals.userId = verified.id;
  res.locals.name = verified.name;
  next();
}
