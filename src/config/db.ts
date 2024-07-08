import mongoose from "mongoose";

const connectDB = async (uri?: string): Promise<void> => {
  try {
    const mongoURI = uri || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/product";
    await mongoose.connect(mongoURI);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;