import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("connect to mongoDB", conn.connection.host);
  } catch (error) {
    console.log("Failed to connect MongoDB", error);
    process.exit(1); //0 means succes 1 means failure
  }
};
