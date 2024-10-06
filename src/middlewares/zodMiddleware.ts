import { NextFunction, Response } from "express";
import { ZodSchema } from "zod";
import responseHandler from "../services/responseHandler";

export const zodSchemaValidator =
  (schema: ZodSchema<any>, requestPayload: { body?: boolean; query?: boolean }) =>
  (req: any, res: Response, next: NextFunction): any => {
    try {
      let requestData = {};
      if (requestPayload.body) {
        requestData = { ...req.body };
      }
      if (requestPayload.query) {
        requestData = { ...requestData, ...req.query };
      }
      let result = schema.safeParse(requestData);
      if (!result.success) {
        const errors: any = result.error.errors.map((error: any) => ({
          path: error.path.join(","),
          message: error.message,
        }));
        let firstError: string = errors?.[0]?.message;
        if (!errors?.[0]?.message.includes(errors?.[0]?.path)) {
          firstError = errors?.[0]?.path + " : " + errors?.[0]?.message;
        }
        return responseHandler.validationError(res, firstError);
      } else {
        next();
      }
    } catch (error) {
      return responseHandler.error(res, error);
    }
  };
