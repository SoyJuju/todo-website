import express from 'express';
import cors from 'cors';
import todoRoutes from './router/todoRouter.js';
import userRoutes from './router/userRouter.js';
import connectDb from './config/dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();

/*global process*/

const PORT = process.env.VITE_PORT;

connectDb();

const app = express();
app.use(
  cors({
    origin: ['https://todo-website-q8k9p8jh4-soyjuju.vercel.app/'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/todo-list', todoRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
