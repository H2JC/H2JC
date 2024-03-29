import express from "express";
import { config } from 'dotenv';
import userRoute from './routes/userRoute';
import queriesRoute from './routes/queriesRoute';
import authRoute from './routes/authRoute';
import creatorRoute from './routes/creatorRoute';
import cors from 'cors';

config();

// Initalizing express server
const app = express();

app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/creator', creatorRoute);
app.use('/api/query', queriesRoute);

console.log("App is running");

export default app;