import { Router } from "express";
const router = Router();
import * as userController from "./userController";
import { verifyToken } from "../auth/authMiddleware";

router.get("/list", verifyToken, userController.listUsers);
router.get("/socket-list", verifyToken, userController.socketListUsers);

export default router;
