import validateToken from '../middleware/validateTokenHandler.js';
import express from 'express';
const router = express.Router();

import {
  registerUser,
  loginUser,
  getUser,
} from '../controllers/userControllers.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken, getUser);

export default router;
