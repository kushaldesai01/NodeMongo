import { Router } from "express";
const router = Router();
import authRoute from "../modules/auth/authRouter";
import userRoute from "../modules/user/userRouter";
import testRoute from "../modules/test/testRouter";

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/test", testRoute);

export default router;