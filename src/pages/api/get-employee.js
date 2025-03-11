import mongoose from "mongoose";
import Employee from "../../models/Employee"; // Ensure the Employee model exists
import { connectToDatabase } from "../../lib/mongodb"; // Ensure the correct path

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await connectToDatabase(); // Connect to MongoDB

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Employee ID is required" });

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Employee ID format" });
  }

  try {
    const employee = await Employee.findById(id);

    if (!employee) return res.status(404).json({ error: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
