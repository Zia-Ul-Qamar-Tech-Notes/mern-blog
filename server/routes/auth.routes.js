import express from "express";
import {
  signup,
  signin,
  refreshToken,
  logout,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", (req, res) => {
  // Handle signup logic here
  signup(req, res);
});
router.post("/login", (req, res) => {
  // Handle signup logic here
  signin(req, res);
});

router.post("/refresh-token", (req, res) => {
  // Handle refresh token logic here
  refreshToken(req, res);
});

router.post("/logout", (req, res) => {
  // Handle logout logic here
  logout(req, res);
});

export default router;
