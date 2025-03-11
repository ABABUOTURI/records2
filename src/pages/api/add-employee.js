


import mongoose from "mongoose";
import Employee from "../../models/Employee"; // Ensure you create an Employee model
import { connectToDatabase } from "../../lib/mongodb"; // Ensure you have the Mongoose connection function

export default async function handler(req, res) {
  await connectToDatabase(); // Ensure the database is connected

  if (req.method === "POST") {
    console.log("Received request body:", req.body); // Debugging log

    const { firstName, lastName, email, phone, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const newEmployee = new Employee({
        firstName,
        lastName,
        email,
        phone,
        role,
        createdAt: new Date(),
      });

      const savedEmployee = await newEmployee.save();
      return res.status(201).json({
        message: "Employee added successfully!",
        employee: savedEmployee,
      });
    } catch (error) {
      return res.status(500).json({ error: "Database error", details: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const employees = await Employee.find({});
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ error: "Database error", details: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
