import express from "express";
import {env} from './config/env.js';
import {connectDB} from './config/db.js';
const app=express();

await connectDB();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(env.PORT, () => {
  console.log("Server is running on port 5000");
});