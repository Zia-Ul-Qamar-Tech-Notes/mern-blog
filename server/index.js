import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./db/dbConfig.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
