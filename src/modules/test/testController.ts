import { Request, Response } from "express";
import { responseHandler } from "../../services/responseHandler";
import fs from "fs";
import { testModel } from "./testModel";

export const test = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.send("In test API");
  } catch (error: any) {
    return res.send(error.message);
  }
};

export const fileUploadSingle = async (req: Request, res: Response) => {
  try {
    // console.log(req.file);
    // await fs.promises.unlink(`${req.file?.destination}${req.file?.filename}`);
    return responseHandler(res).success("Single file uploaded");
  } catch (error: any) {
    return responseHandler(res).failure(error.message);
  }
};

export const fileUploadMultiple = async (req: Request, res: Response) => {
  try {
    // console.log(req.files);
    return responseHandler(res).success("Multiple file uploaded");
  } catch (error: any) {
    return responseHandler(res).failure(error.message);
  }
};

export const connectModelDatabase = async (req: Request, res: Response) => {
  try {
    // Transaction acid
    // socket.io
    await testModel.create({ user_id: req.user_id });
    let val = await testModel.find({}).populate("user_id");
    return responseHandler(res).success("");
  } catch (error: any) {
    return responseHandler(res).failure(error.message);
  }
};

export const ejsRender = async (req: Request, res: Response) => {
  try {
    const name = "John Doe";
    const age = 30;
    res.render("test", { name, age });
  } catch (error: any) {
    return responseHandler(res).failure(error.message);
  }
};
