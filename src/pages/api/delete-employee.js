import mongoose from "mongoose";
import Employee from "../../models/Employee"; // Ensure the Employee model exists
import { connectToDatabase } from "../../lib/mongodb"; // Ensure the correct path

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectToDatabase(); // Connect to MongoDB

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    // Delete employee using Mongoose
    const result = await Employee.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal Server Error", details: error.message });
  }
}
