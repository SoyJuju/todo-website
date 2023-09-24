import express from 'express';
import cors from 'cors';
import todoRoutes from './api/todoRouter.js';
import userRoutes from './api/userRouter.js';
import connectDb from './config/dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();

connectDb();

const app = express();
app.use(
  cors({
    origin: ['https://todo-website-q4i27sngh-soyjuju.vercel.app'],
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true,
  })
);
app.use(express.json());

app.use('/', (req, res) => {
  res.json('Hello');
});
app.use('/api/todo-list', todoRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
