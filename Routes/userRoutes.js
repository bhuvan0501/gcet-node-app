import express from "express";
import userModel from '../models/userModel.js'; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken" ;
const SECRET_KEY = "helloworld";
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  const hashpassword = await bcrypt.hash(pass,10);
  const result = await userModel.insertOne({
    name: name,
    email: email,
    pass: hashpassword,
  });
  return res.json(result);
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const result = await userModel.findOne({ email, pass });
  if (!result) return res.json({ message: "Invalid user or password" });
  const token =jwt.sign({email: result.email,id: result._id},SECRET_KEY);
  return res.json({user: result,token:token});
  console.log(result)
});



export default userRouter;