import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import { APP } from "./variables/constants";
import { connectToDatabase } from "./database/connection";
const app = express();
import appRouter from "./services/router";
import { swaggerJSON } from "./services/swagger";
import { responseHandler } from "./services/responseHandler";

// database connection
connectToDatabase();

// middleware
app.use(express.json());

// swagger
app.use("/swagger", swaggerUI.serveFiles(swaggerJSON), (req: Request, res: Response) => {
  res.send(swaggerUI.generateHTML(swaggerJSON));
});

// app router
app.use("/api", appRouter);

// catch any error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return responseHandler(res, err.status || 500).failure(err.message || "Internal server error");
});

// URL not found error
app.use("*", (req: Request, res: Response) => {
  return responseHandler(res, 404).failure("URL not found");
});

// app listen
app.listen(APP.PORT, () => {
  console.log(APP.APP_LINK);
});
