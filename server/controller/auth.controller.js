import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(
      { id: checkUser._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

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

const refreshToken = async (req, res) => {
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
        const newAccessToken = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

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

export { signup, signin, refreshToken, logout };
