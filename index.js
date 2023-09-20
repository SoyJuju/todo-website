import express from 'express';
import cors from 'cors';
import todoRoutes from './router/todoRouter.js';
import userRoutes from './router/userRouter.js';
import connectDb from './config/dbConnection.js';

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/todo-list', todoRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000.');
});
