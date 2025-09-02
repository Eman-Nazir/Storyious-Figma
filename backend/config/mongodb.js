
import mongoose from "mongoose";

const connectDB = async () => {
  const dbName = "storyious";

  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${dbName}?retryWrites=true&w=majority`);
    console.log(`Database "${dbName}" Connected`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export default connectDB;
