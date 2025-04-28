import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dqj0xgk8h/image/upload/v1698230984/BlogApp/defaultProfilePic.png",
    },
    refreshToken: String,
    googleAuth: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
