import express from "express";
import authenticate from "../utils/authenticate.js";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  res.send("User route is working");
});

export default router;
