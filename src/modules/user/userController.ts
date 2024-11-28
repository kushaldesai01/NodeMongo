import { Request, Response } from "express";
import { responseHandler } from "../../services/responseHandler";
import { getErrorMessage } from "../../services/functions";
import { userModel } from "./userModel";
import { io } from "../..";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const userList = await userModel.find({}, { name: 1, email: 1 });
    io.emit("message", userList);
    return responseHandler(res).success("User list fetched successfully", userList);
  } catch (error: unknown) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};
