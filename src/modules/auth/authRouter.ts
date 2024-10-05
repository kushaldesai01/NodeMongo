import { Router } from "express";
const router = Router();
import * as authController from "./authController";
import { signupSchema } from "./authSchema";
import { zodSchemaValidator } from "../../middlewares/zodMiddleware";

router.post("/signup", zodSchemaValidator(signupSchema, { body: true }), authController.signup);
router.post("/login", authController.login);

export default router;
