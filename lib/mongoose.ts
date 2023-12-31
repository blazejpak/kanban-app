import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MONGODB_ENV not found!");
  if (isConnected) return console.log("Already connected to MongoDB");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
  } catch (error) {
    console.log(error);
    //cloud.mongodb.com/v2/6515b3b79a48321bccc87431#/triggers
    https: isConnected = false;
  }
};
