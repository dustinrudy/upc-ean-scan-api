import User from "../models/users.model";
import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {

// })

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, ...requestBodyData } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).send({ message: `Email ${email} Already Registered!` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      ...requestBodyData,
    });

    await newUser.save();

    res.status(201).send({ message: 'User Created' })

  } catch (error) {
    console.log("ERR: ", error);
    res.status(500).send({ error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET as Secret,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

export default router;
