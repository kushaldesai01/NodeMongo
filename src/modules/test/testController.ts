import { Request, Response } from "express";
import { responseHandler } from "../../services/responseHandler";

export const test = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.send("In test API");
  } catch (error: any) {
    return res.send(error.message);
  }
};

export const fileUpload = async (req: Request, res: Response) => {
  try {
    console.log("req", req.file);
    return responseHandler(res).success("In file upload");
  } catch (error: any) {
    return responseHandler(res).failure(error.message);
  }
};
