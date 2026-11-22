import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {env} from './config/env.js';
import {connectDB} from './config/db.js';
import {logger} from './middlewares/logger.js';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import mealPlanRoutes from "./routes/mealPlanRoutes.js";
import pfdRoutes from "./routes/pdfRoutes.js";
import path from "path";

const app=express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));



app.use(express.json());
app.use(logger);
app.use(cookieParser());

//path

app.use("/api/v1/auth",authRoutes);

app.use("/api/v1/user",userRoutes);

app.use("api/v1/recipe",recipeRoutes);

app.use("api/v1/favoritr",favoriteRoutes);

app.use("api/v1/review",reviewRoutes);

app.use("/api/v1/meal-plans", mealPlanRoutes);

app.use("/api/V1/pdf",pfdRoutes);

//upload

app.use("/uploads",express.static(path.join(path.resolve(),"uploads" )));


app.get('/', (req, res) => {
  res.send('Hello World');
});
//connect to Database

await connectDB();


app.listen(env.PORT, () => {console.log("Server is running on port 5000");});