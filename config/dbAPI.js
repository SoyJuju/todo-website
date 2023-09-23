import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/*global process*/
const API_KEY = process.env.VITE_API_KEY;

const makeMongoDBApiRequest = async () => {
  const data = JSON.stringify({
    collection: 'todo-lists',
    database: 'mern-basic-todo',
    dataSource: 'Cluster0',
    projection: {
      _id: 1,
    },
  });

  const config = {
    method: 'post',
    url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gczoo/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    data: data,
  };

  const response = await axios(config);

  return response.data;
};

export default makeMongoDBApiRequest;
