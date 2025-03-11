// import { connectToDatabase } from "../../lib/mongodb";
// import Employee from "../../models/Employee";
// import mongoose from "mongoose";

// export default async function handler(req, res) {
//     console.log("📩 Received request:", req.method, req.url, req.body);

//     if (req.method !== "PUT") {
//         return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     try {
//         await connectToDatabase(); // Ensure MongoDB connection

//         const { id, firstName, lastName, email, phone, role  } = req.body;

//         if (!id || !firstName || !lastName || !email || !phone || !role) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

//         // Validate MongoDB ObjectId format
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ error: "Invalid Employee ID format" });
//         }

//         // Update Employee
//         const updatedEmployee = await Employee.findByIdAndUpdate(
//             id,
//             { firstName, lastName,  email, phone,  role, createdAt: new Date() },
//             { new: true, runValidators: true } // Ensure updated data is validated
//         );

//         if (!updatedEmployee) {
//             return res.status(404).json({ error: "Employee not found" });
//         }

//         console.log("✅ Employee updated successfully:", updatedEmployee);
//         return res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
//     } catch (error) {
//         console.error("❌ Error updating employee:", error);
//         return res.status(500).json({ error: "Internal Server Error", details: error.message });
//     }
// }

import { connectToDatabase } from "../../lib/mongodb";
import Employee from "../../models/Employee";
import mongoose from "mongoose";

export default async function handler(req, res) {
    console.log("📩 Received request:", req.method, req.url, req.body);

    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        await connectToDatabase(); // Ensure MongoDB connection

        const { id, firstName, lastName, email, phone, role, employeeIds, newRole } = req.body;

        if (employeeIds && employeeIds.length > 0 && newRole) {
            // ✅ Bulk Update: Update multiple employees' roles
            const invalidIds = employeeIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
            if (invalidIds.length > 0) {
                return res.status(400).json({ error: "Invalid Employee ID format", invalidIds });
            }

            const result = await Employee.updateMany(
                { _id: { $in: employeeIds.map(id => new mongoose.Types.ObjectId(id)) } },
                { $set: { role: newRole } }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: "Employees not found" });
            }

            console.log(`✅ Updated ${result.modifiedCount} employees' roles to ${newRole}`);
            return res.status(200).json({ message: "Roles updated successfully", result });
        } 
        else if (id && firstName && lastName && email && phone && role) {
            // ✅ Single Update: Update full details of one employee
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid Employee ID format" });
            }

            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                { firstName, lastName, email, phone, role, createdAt: new Date() },
                { new: true, runValidators: true }
            );

            if (!updatedEmployee) {
                return res.status(404).json({ error: "Employee not found" });
            }

            console.log("✅ Employee updated successfully:", updatedEmployee);
            return res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
        } 
        else {
            return res.status(400).json({ error: "Invalid request format or missing required fields" });
        }
    } catch (error) {
        console.error("❌ Error updating employee:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
