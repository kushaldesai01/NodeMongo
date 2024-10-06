import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import responseHandler from "../../services/responseHandler";
import { userModel } from "../user/userModel";
import { APP } from "../../variables/constants";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = (req.headers["Token"] as string) || (req.headers["Authorization"] as string);
    if (!token) {
      return responseHandler.unauthorized(res, "Token required");
    }
    let headerArr = token?.split(" ");
    if (headerArr.length > 1) {
      token = headerArr[1];
    } else {
      token = headerArr[0];
    }
    try {
      let val = await userModel.find({ token: token });
      if (val.length === 0) {
        return responseHandler.unauthorized(res, "Invalid token");
      }
      jwt.verify(token, APP.JWT_SECRET_KEY);
      req.user_id = String(val[0]["_id"]);
      req.email = val[0]["email"];
      return next();
    } catch (err) {
      return responseHandler.unauthorized(res, "Invalid token");
    }
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

// export const verifyAdmin = async (req: any, res: Response, next: NextFunction) => {
//   try {
//     let val = await userModel.find({ _id: req.user_id });
//     if (val?.[0]?.type !== "admin") {
//       return responseHandler.validationError(res, "You don't have enough permission to perform this action");
//     }
//     return next();
//   } catch (error) {
//     return responseHandler.error(res, error);
//   }
// };
