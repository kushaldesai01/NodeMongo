import * as dotenv from 'dotenv';
dotenv.config();

export const APP = {
  PORT: 5000,
  APP_URL: "http://localhost:5000",
  WEB_APP_URL: "http://localhost:3000",
  DATABASE_URL: "mongodb://localhost:27017/NodeMongo",
  JWT_SECRET_KEY: "AkEpJiGtUqE",
  CRYPTO_KEY: "QsYbhsUePWc",
};

export const MAIL_SERVICE = {
  EMAIL: "",
  PASSWORD: "",
}