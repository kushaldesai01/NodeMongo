import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import http from "http";
import { Server } from "socket.io";
import { APP } from "./variables/constants";
import { connectToDatabase } from "./database/connection";
const app = express();
import appRouter from "./services/router";
import { swaggerJSON } from "./services/swagger";
import { responseHandler } from "./services/responseHandler";
import { socketHandler } from "./services/socketHandler";

// Create an HTTP server
const server = http.createServer(app);
// Socket IO
export const io = socketHandler(server);

// database connection
connectToDatabase();

// middleware
app.use(cors());
app.use(express.json());


// test route
app.get("/", (req: Request, res: Response) => {
  res.send(`${APP.APP_URL}/swagger`);
});

// swagger
app.use("/swagger", swaggerUI.serveFiles(swaggerJSON), (req: Request, res: Response) => {
  res.send(swaggerUI.generateHTML(swaggerJSON));
});

// app router
app.use("/api", appRouter);

// catch any error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return responseHandler(res, err?.status ?? 500).failure(err?.message ?? "Internal server error");
});

// URL not found error
app.use("*", (req: Request, res: Response) => {
  return responseHandler(res, 404).failure("URL not found");
});

// server listen
server.listen(APP.PORT, () => {
  console.log(APP.APP_URL);
});
