import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  console.log("Connecting to database...");
  try {
    const DB_OPTIONS = {
      dbName: "orienshop",
    };

    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.error(error.stack); // Shows stack trace for debugging
  }
};

export default connectDB;
