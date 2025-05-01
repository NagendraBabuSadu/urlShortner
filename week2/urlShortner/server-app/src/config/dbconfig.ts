import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
  
    console.log("MongoDB Connected Successfully ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  }
};

export default connectDb;
