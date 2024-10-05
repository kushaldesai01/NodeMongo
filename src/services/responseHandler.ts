import { Response } from "express";

const success = (res: Response, message: string | string[] | null, data: any = null) => {
  return res.status(200).json({ status: res.statusCode, success: true, notification: message, data: data });
};

const unauthorized = (res: Response, message: string | string[] | null, data: any = null) => {
  return res.status(401).json({ status: res.statusCode, success: false, notification: message, data: data });
};

const validationError = async (res: Response, message: string | string[] | null, data: any = null) => {
  return res.status(422).json({ status: res.statusCode, success: false, notification: message, data: data });
};

const error = (res: Response, err: any, data: any = null) => {
  return res.status(422).json({ status: res.statusCode, success: false, notification: err.message, data: data });
};

export default { success, unauthorized, validationError, error };
