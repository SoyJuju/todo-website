import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/*global process*/
const CONNECTION_STRING = process.env.VITE_CONNNECTION_STRING;

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(CONNECTION_STRING);
    console.log(
      'Database connected: ',
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    return;
  }
};

export default connectDb;
