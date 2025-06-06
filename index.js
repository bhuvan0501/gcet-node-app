import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const DBUSER = encodeURIComponent(process.env.DBUSER)
const DBPASS = encodeURIComponent(process.env.DBPASS)
const MONGO_URI =`mongodb+srv://${DBUSER}:${DBPASS}@cluster0.l2pyebp.mongodb.net/gcet?retryWrites=true&w=majority&appName=Cluster0`


// const MONGO_URI = process.env.MONGO_URI
//testing
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders",orderRouter)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server Started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });