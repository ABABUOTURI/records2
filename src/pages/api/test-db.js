import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }

    console.log("Connecting to MongoDB...");

    const client = new MongoClient(uri);
    await client.connect();

    console.log("Connected to MongoDB!");
    
    res.status(200).json({ message: "Connected to MongoDB!" });
  } catch (error) {
    console.error("Connection Error:", error);
    res.status(500).json({ error: "Connection failed", details: error.message });
  }
}
