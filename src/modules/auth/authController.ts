import { Request, Response } from "express";
import responseHandler from "../../services/responseHandler";
import { userModel } from "../user/userModel";
import { checkJWTExpire, generateJWT } from "./authService";
import { loginSchemaType, signupSchemaType } from "./authSchema";
import { stringDecryption, stringEncryption } from "../../services/functions";

export const signup = async (req: Request<{}, {}, signupSchemaType>, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const emailCounts = await userModel.countDocuments({ email: email });
    if (emailCounts > 0) {
      return responseHandler.validationError(res, "Email already exists");
    }
    const data = await userModel.create({
      name: name,
      email: email,
      password: await stringEncryption(password),
      token: await generateJWT({ email: email }),
    });
    return responseHandler.success(res, "Signed up successfully", { token: data?.token });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

export const login = async (req: Request<{}, {}, loginSchemaType>, res: Response) => {
  try {
    const { email, password } = req.body;
    const findEmail = await userModel.find({ email: email }, { password: 1, token: 1 });
    if (findEmail.length === 0) {
      return responseHandler.validationError(res, "Invalid credentials");
    }
    const decryptedPassword = await stringDecryption(findEmail[0]["password"]);
    if (password !== decryptedPassword) {
      return responseHandler.validationError(res, "Invalid credentials");
    }

    const isTokenExpired = await checkJWTExpire(findEmail[0]["token"] ?? "");
    let generatedToken: string;
    if (isTokenExpired) {
      generatedToken = await generateJWT({ email: email });
      await userModel.updateOne({ email: email }, { $set: { token: generatedToken } });
    } else {
      generatedToken = findEmail[0]["token"] as string;
    }
    return responseHandler.success(res, "Logged in successfully", { token: generatedToken });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};
