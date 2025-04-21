import mongoose from "mongoose";

export default function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) =>
      console.error("MongoDB connection failed", error.message)
    );
}
