import { Config } from "./type";
import dotenv from "dotenv";

dotenv.config();

const MONGO_CONNECTION_URL = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.jkxmty6.mongodb.net/products?retryWrites=true&w=majority`;

const MongoConfig: Pick<
  Config,
  "API_KEY" | "URI" | "BASE_URL" | "USER" | "PASSWORD"
> = {
  API_KEY: process.env.MONGO_API_KEY || '',
  USER: process.env.MONGO_USER_NAME || '',
  PASSWORD: process.env.MONGO_PASSWORD || '',
  BASE_URL: process.env.MONGO_CONNECTION_URL || '',
  URI: MONGO_CONNECTION_URL || ''
};

export default MongoConfig;
