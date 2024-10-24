import { Request, Response } from "express";
import { responseHandler } from "../../services/responseHandler";
import { userModel } from "../user/userModel";
import { checkJWT, generateJWT, generateOtp } from "./authService";
import {
  checkResetPasswordLinkSchemaType,
  forgotPasswordSchemaType,
  loginSchemaType,
  resetPasswordSchemaType,
  signupSchemaType,
} from "./authSchema";
import { getErrorMessage, sendMail, stringDecryption, stringEncryption } from "../../services/functions";
import { APP } from "../../variables/constants";

export const signup = async (req: Request<{}, {}, signupSchemaType>, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const emailCounts = await userModel.countDocuments({ email: email });
    if (emailCounts > 0) {
      return responseHandler(res).failure("Email already exists");
    }
    const data = await userModel.create({
      name: name,
      email: email,
      password: await stringEncryption(password),
      token: await generateJWT({ email: email }),
    });
    return responseHandler(res).success("Signed up successfully", { token: data?.token });
  } catch (error) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};

export const login = async (req: Request<{}, {}, loginSchemaType>, res: Response) => {
  try {
    const { email, password } = req.body;
    const findEmail = await userModel.findOne({ email: email }, { password: 1, token: 1 });
    if (!findEmail) {
      return responseHandler(res, 404).failure("Invalid credentials");
    }
    const decryptedPassword = await stringDecryption(findEmail.password);
    if (password !== decryptedPassword) {
      return responseHandler(res, 404).failure("Invalid credentials");
    }

    const checkToken = await checkJWT(findEmail.token ?? "");
    let generatedToken: string;
    if (!checkToken.valid) {
      generatedToken = await generateJWT({ email: email });
      await userModel.updateOne({ email: email }, { $set: { token: generatedToken } });
    } else {
      generatedToken = findEmail.token as string;
    }
    return responseHandler(res).success("Logged in successfully", { token: generatedToken });
  } catch (error) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await userModel.updateOne({ _id: req.user_id }, { $set: { token: null } });
    return responseHandler(res).success("Logged out successfully");
  } catch (error) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};

export const forgotPassword = async (req: Request<{}, {}, forgotPasswordSchemaType>, res: Response) => {
  try {
    const { email } = req.body;
    const emailCounts = await userModel.countDocuments({ email: email });
    if (emailCounts === 0) {
      return responseHandler(res).failure("Email not found");
    }
    const otp = generateOtp(6);
    await userModel.updateOne({ email: email }, { $set: { otp: otp, otp_timestamp: Date.now() } });
    // await sendMail({
    //   from: "",
    //   to: "",
    //   subject: "Link to reset your password",
    //   text: `Click on the link to reset your password: ${APP.WEB_APP_URL}/forgot-password?email=${email}&otp=${otp}`,
    // });
    return responseHandler(res).success(
      "Reset password link mailed successfully",
      `Click on the link to reset your password: ${APP.WEB_APP_URL}/forgot-password?Click on the link to reset your password: ${APP.WEB_APP_URL}/forgot-password?email=${email}&otp=${otp}`
    );
  } catch (error) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};

export const resetPassword = async (req: Request<{}, {}, resetPasswordSchemaType>, res: Response) => {
  try {
    const { email, otp, password } = req.body;
    const findUser = await userModel.findOne({ email: email, otp: otp });
    if (!findUser) {
      return responseHandler(res).failure("Invalid link");
    }
    if ((Date.now() - (findUser.otp_timestamp ?? 0)) / (1000 * 60) > 30) {
      return responseHandler(res).failure("Link expired");
    }
    await userModel.updateOne({ email: email }, { $set: { password: password, otp: "", otp_timestamp: null } });
    return responseHandler(res).success("Password updated successfully");
  } catch (error) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};

export const checkResetPasswordLink = async (req: Request<{}, {}, checkResetPasswordLinkSchemaType>, res: Response) => {
  try {
    const { email, otp } = req.body;
    const findUser = await userModel.findOne({ email: email, otp: otp });
    if (!findUser) {
      return responseHandler(res).failure("Invalid link");
    }
    if ((Date.now() - (findUser.otp_timestamp ?? 0)) / (1000 * 60) > 30) {
      return responseHandler(res).failure("Link expired");
    }
    return responseHandler(res).success("Link verified");
  } catch (error) {
    return responseHandler(res).failure(getErrorMessage(error));
  }
};
