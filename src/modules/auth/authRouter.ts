import { Router } from "express";
const router = Router();
import * as authController from "./authController";
import {
  checkResetPasswordLinkSchema,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "./authSchema";
import { zodSchemaValidator } from "../../middlewares/zodMiddleware";
import { verifyToken } from "./authMiddleware";

router.post("/signup", zodSchemaValidator(signupSchema, { body: true }), authController.signup);
router.post("/login", zodSchemaValidator(loginSchema, { body: true }), authController.login);
router.post("/logout", verifyToken, authController.logout);
router.post(
  "/forgot-password",
  zodSchemaValidator(forgotPasswordSchema, { body: true }),
  authController.forgotPassword
);
router.post("/reset-password", zodSchemaValidator(resetPasswordSchema, { body: true }), authController.resetPassword);
router.post(
  "/check-reset-password-code",
  zodSchemaValidator(checkResetPasswordLinkSchema, { body: true }),
  authController.checkResetPasswordLink
);

export default router;
