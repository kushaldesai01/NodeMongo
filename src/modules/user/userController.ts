import { Request, Response } from "express";
import { responseHandler } from "../../services/responseHandler";
import { getErrorMessage } from "../../services/functions";
import { userModel } from "./userModel";
import { io } from "../../index";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const page = 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const userList = await userModel.find({}, { name: 1, email: 1 }).skip(skip).limit(pageSize);
    return responseHandler(res).success("User list fetched successfully", userList);
  } catch (error: unknown) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};

export const socketListUsers = async (req: Request, res: Response) => {
  try {
    const userList = await userModel.find({}, { name: 1, email: 1 });
    io.emit("scoreList", [{ virat: 100, rohit: 99 }]);
    let userDetails = await userModel.findOne({ _id: req.user_id }, { socket_id: 1 });
    if (userDetails?.socket_id) {
      io.to(userDetails.socket_id).emit("friendList", ["virat", "rohit"]);
    }
    return responseHandler(res).success("User list fetched successfully", userList);
  } catch (error: unknown) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};

// setInterval(() => {
//   console.log([{name: "harsh", age: 30}, {name: "vedant", age: 30}, {name: "devarsh", age: 30}]);
// }, 5000);
