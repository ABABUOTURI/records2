import { MongoClient } from "mongodb";

// MongoDB URI and Database Name
const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId } = req.body; // You will send the userId in the request body

      // Connect to MongoDB
      await client.connect();
      const db = client.db("employee"); // Replace with your database name
      const usersCollection = db.collection("users"); // Replace with your collection name

      // Delete the user from MongoDB
      const result = await usersCollection.deleteOne({ _id: userId });

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: "User data deleted successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Server error" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
