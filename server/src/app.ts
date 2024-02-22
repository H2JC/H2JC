import express from "express";
import { config } from 'dotenv';
import userRoute from './routes/userRoute';
import queriesRoute from "./routes/queriesRoute";
import cors from "cors";

config();

// Initalizing express server
const app = express();

app.use(cors(
    {
        origin: '*',
    }
))

app.use(express.json());

app.use('/users', userRoute);

app.use('/queries', queriesRoute);

export default app;