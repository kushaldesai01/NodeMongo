import { Router } from "express";
const router = Router();
import authRoute from "../modules/auth/authRouter";
import userRoute from "../modules/user/userRouter";

router.use("/auth", authRoute);
router.use("/user", userRoute);

export default router;