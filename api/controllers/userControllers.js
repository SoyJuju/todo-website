import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/*global process*/
const ACCESS_TOKEN = process.env.VITE_ACCESS_TOKEN_SECRET;

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are necessary!');
  }

  const userAvailable = await User.findOne({ email: email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashedPassword });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      ACCESS_TOKEN
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Email or password is not valid');
  }
});

export const getUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
