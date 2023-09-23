import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/*global process*/
const ACCESS_TOKEN = process.env.VITE_ACCESS_TOKEN_SECRET;

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized');
      }
      req.user = decoded.user;
      next();
    });
  }

  if (!token) {
    res.status(401);
    throw new Error('User not authorized or token missing');
  }
});

export default validateToken;
