import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/authenticate.js";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return res.send(errorHandler(400, "Please fill all the fields"));
    }
    if (password.length < 4) {
      return errorHandler(400, "Password must be at least 4 characters long");
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already Exists" });
    }
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(400).json({ message: "This Username already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.status(200).json({
      status: "success",
      message: "Signup successful",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return res.send(errorHandler(400, "Please fill all the fields"));
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(401).json({ message: "User not Found" });
    }
    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = generateAccessToken({ id: checkUser._id });
    const refreshToken = generateRefreshToken({ id: checkUser._id });

    checkUser.refreshToken = refreshToken;
    await checkUser.save();
    res.send({
      status: "success",
      code: 200,
      message: "Signin successful",
      user: {
        id: checkUser._id,
        username: checkUser.username,
        email: checkUser.email,
      },
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not provided" });
    }

    // Verify JWT validity
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });

        // Find user and check if the refresh token matches
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
          return res
            .status(403)
            .json({ message: "Refresh token not recognized" });
        }

        // Generate new access token
        const newAccessToken = generateAccessToken({ id: user._id });

        res
          .status(200)
          .json({ status: "success", accessToken: newAccessToken });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  const { userId } = req.body;
  await User.findByIdAndUpdate(userId, { refreshToken: null });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

const googleAuth = async (req, res) => {
  try {
    const { name, email, image } = req.body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      const token = generateAccessToken({ id: checkEmail._id });
      checkEmail.profilePic = image;
      await checkEmail.save();
      return res.status(200).json({
        status: "success",
        message: "Signin successful",
        user: {
          id: checkEmail._id,
          username: checkEmail.username,
          email: checkEmail.email,
          image: checkEmail.profilePic,
          name: name,
        },
        token: token,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
        googleAuth: true,
        profilePic: image,
      });
      const savedUser = await newUser.save();
      const token = generateAccessToken({ id: savedUser._id });
      return res.status(200).json({
        status: "success",
        message: "Signup successful",
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          image: savedUser.profilePic,
          name: name,
        },
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, signin, refreshAccessToken, logout, googleAuth };
