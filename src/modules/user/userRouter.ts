import { Router } from "express";
const router = Router();
import * as userController from "./userController";

router.get("/list", userController.listUsers);

export default router;
