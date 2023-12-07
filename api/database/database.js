import mongoose from "mongoose";
export default async function main() {
  try {
    const db = await mongoose.connect(
      process.env.MONGO_URL ||
        "mongodb+srv://araiz:araiz@cluster0.7ewkzpg.mongodb.net/"
    );
    if (db) {
      console.log("database has been connected");
    }
  } catch (error) {
    console.log("MongoDB Error " + error);
  }
}
