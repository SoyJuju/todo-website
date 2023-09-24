import express from 'express';
import cors from 'cors';
import todoRoutes from './api/todoRouter.js';
import userRoutes from './api/userRouter.js';
import connectDb from './config/dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();

<<<<<<<< HEAD:api/server.js
/*global process*/

========
>>>>>>>> bbf5899ce948769f973e93b16086511de4c9f344:server/server.js
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

<<<<<<<< HEAD:api/server.js
if (process.env.VITE_PORT) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

return app;
========
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
>>>>>>>> bbf5899ce948769f973e93b16086511de4c9f344:server/server.js
