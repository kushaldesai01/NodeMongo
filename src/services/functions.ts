import cryptoJS from "crypto-js";
import { APP, MAIL_SERVICE } from "../variables/constants";
import nodemailer from "nodemailer";
import path from "path";

export const stringEncryption = async (string: string): Promise<string> => {
  try {
    return cryptoJS.AES.encrypt(string, APP.CRYPTO_KEY).toString();
  } catch (error) {
    throw error;
  }
};

export const stringDecryption = async (string: string): Promise<string> => {
  try {
    return cryptoJS.AES.decrypt(string, APP.CRYPTO_KEY).toString(cryptoJS.enc.Utf8);
  } catch (error) {
    throw error;
  }
};

export const sendMail = async (mailOptions: {
  from: string;
  to: string;
  subject?: string;
  text?: string;
  html?: any;
}): Promise<void> => {
  try {
    const mailer = nodemailer.createTransport({
      secure: false,
      auth: {
        user: MAIL_SERVICE.EMAIL,
        pass: MAIL_SERVICE.PASSWORD,
      },
      host: "smtp.gmail.com",
      port: 587,
    });
    await mailer.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "An unknown error occurred";
  }
};

export const directoryPath = (relativePath: string) => {
  return path.join(__dirname, "..", relativePath);
};
