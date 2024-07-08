import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/product");
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", (error as Error).message);
  }
};

export default connectDB;