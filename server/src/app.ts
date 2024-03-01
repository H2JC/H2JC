import express from "express";
import { config } from 'dotenv';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
import creatorRoute from './routes/creatorRoute';
import brandRoute from './routes/brandRoute';

config();

// Initalizing express server
const app = express();

app.use(express.json());

// Define routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/creator', creatorRoute);
app.use('/api/brand', brandRoute);

console.log("App is running");

export default app;