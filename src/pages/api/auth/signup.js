// stores new users securely in MongoDB.

import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { firstName, lastName, email, password } = req.body;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const usersCollection = client.db().collection("users");

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    client.close();
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await usersCollection.insertOne({ firstName, lastName, email, password: hashedPassword });

  client.close();
  res.status(201).json({ message: "User created" });
}
