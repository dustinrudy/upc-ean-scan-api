import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from './routes/items';
import MongoConfig from "./config/mongodb";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;


app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/items', itemRoutes);

mongoose
  .connect(MongoConfig.URI, { retryWrites: true, w: "majority" })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    console.log("CONNECTED TO MONGODB");
  })
  .catch((error) => console.log(error));
