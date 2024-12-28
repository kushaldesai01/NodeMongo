import { Router } from "express";
const router = Router();
import * as userController from "./userController";
import { verifyToken } from "../auth/authMiddleware";

router.get("/list", verifyToken, userController.listUsers);

export default router;
