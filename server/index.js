import express from "express";
import cors from "cors";
import {env} from './config/env.js';
import {connectDB} from './config/db.js';

const app=express();
app.use(cors());

app.use(express.json());

app.use(cors());

await connectDB();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(env.PORT, () => {
  console.log("Server is running on port 5000");
});