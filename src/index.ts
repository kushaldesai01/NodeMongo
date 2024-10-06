import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import { APP } from "./variables/constants";
import { connectToDatabase } from "./database/connection";
const app = express();
import appRouter from "./services/router";
import { swaggerJSON } from "./services/swagger";

connectToDatabase();
app.use(express.json());

// swagger
app.use("/swagger", swaggerUI.serveFiles(swaggerJSON), (req: Request, res: Response) => {
  res.send(swaggerUI.generateHTML(swaggerJSON));
});

// app router
app.use("/api", appRouter);

// catch any error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ status: res.statusCode, success: false, message: err.message || "Internal error" });
});

// URL not found error
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ status: res.statusCode, success: false, message: "URL not found" });
});

app.listen(APP.PORT, () => {
  console.log(APP.APP_LINK);
});
