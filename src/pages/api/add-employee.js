import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return res.status(500).json({ error: "MONGODB_URI is not defined in environment variables" });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("employee"); // Update with your database name
    const collection = db.collection("users");

    const { name, email, position } = req.body;

    if (!name || !email || !position) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEmployee = { name, email, position };
    const result = await collection.insertOne(newEmployee);

    res.status(201).json({ message: "Employee added!", employee: { _id: result.insertedId, ...newEmployee } });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  } finally {
    await client.close();
  }
}
