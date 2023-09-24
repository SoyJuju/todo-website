import express from 'express';
import cors from 'cors';
import todoRoutes from './router/todoRouter.js';
import userRoutes from './router/userRouter.js';
import connectDb from './config/dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/todo-list', todoRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
