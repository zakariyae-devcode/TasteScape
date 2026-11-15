import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {env} from './config/env.js';
import {connectDB} from './config/db.js';
import {logger} from './middlewares/logger.js';

import authRoutes from "./routes/authRoutes.js";

import recipeRoutes from "./routes/recipeRoutes.js"

const app=express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));



app.use(express.json());
app.use(logger);
app.use(cookieParser());

//path

app.use("api/v1/auth",authRoutes);

app.use("api/v1/recipe",recipeRoutes);

//connect to Database

await connectDB();




app.listen(env.PORT, () => {
  console.log("Server is running on port 5000");
});