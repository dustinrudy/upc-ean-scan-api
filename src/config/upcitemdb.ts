import { Config } from "./type";
import dotenv from "dotenv";

// https://api.upcitemdb.com

dotenv.config();

const UpcitemdbConfig: Pick<
  Config,
  "BASE_URL"
> = {
  BASE_URL: process.env.UPCITE_MDB_URL || '',
};

export default UpcitemdbConfig;