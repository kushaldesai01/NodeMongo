import express from "express";
import { APP } from "./variables/constants";
import { connectToDatabase } from "./database/connection";
const app = express();
import appRouter from "./services/router";

connectToDatabase();

app.use(express.json());
app.use("/api", appRouter);

app.listen(APP.PORT, () => {
  console.log(APP.APP_LINK);
});
