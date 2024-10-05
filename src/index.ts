import express from "express";
import { APP } from "./variables/constants";
import { connectToDatabase } from "./database/connection";
const app = express();
import authRoute from "./modules/auth/authRouter";

connectToDatabase();

app.use(express.json());
app.use("/auth", authRoute);

app.listen(APP.PORT, () => {
  console.log(APP.APP_LINK);
});
