import { Response } from "express";
// interface ResponseHandler {
//   statusCode: number | null;
//   status: (status: number) => ResponseHandler;
//   success: (res: Response, message: string | string[] | null, data?: any) => void;
//   failure: (res: Response, message: string | string[] | null, data?: any) => void;
// }

// export const responseHandlerNew: ResponseHandler = {
//   statusCode: null,
//   status: (status: number) => {
//     responseHandlerNew.statusCode = status;
//     return responseHandlerNew;
//   },
//   success: (res: Response, message: string | string[] | null, data: any = null) => {
//     res.status(responseHandlerNew.statusCode ?? 200).json({ success: true, message: message, data: data });
//     responseHandlerNew.statusCode = null;
//   },
//   failure: (res: Response, message: string | string[] | null, data: any = null) => {
//     res.status(responseHandlerNew.statusCode ?? 422).json({ success: false, message: message, data: data });
//     responseHandlerNew.statusCode = null;
//   },
// };

export const responseHandler = (res: Response, statusCode: number | null = null) => {
  return {
    success: (message: string | string[] | null, data: any = null) => {
      res.status(statusCode ?? 200).json({ success: true, message: message, data: data });
    },
    failure: (message: string | string[] | null, data: any = null) => {
      res.status(statusCode ?? 422).json({ success: false, message: message, data: data });
    },
  };
};
