// src/components/Employee.tsx
import React from "react";
import { FaTrash } from "react-icons/fa";
import "@/styles/globals.css";

const employees = [
  { firstName: "Joshua", lastName: "Bakare", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Admin" },
  { firstName: "Jane", lastName: "Clement", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
  { firstName: "Hannah", lastName: "Johnson", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
  { firstName: "John", lastName: "Ngoka", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
  { firstName: "Omotayo", lastName: "Adeleke", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
  { firstName: "Gloria", lastName: "Amadi", email: "josh.bakery@gmail.com", phone: "+2348012345678", role: "Staff" },
];

const Employee = () => {
  return (
    <div className="table-container">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <div className="flex justify-between items-center mb-4">
        <select className="border p-2 rounded-md">
          <option>Change role</option>
          <option>Admin</option>
          <option>Staff</option>
        </select>
        <button className="btn-primary">Change</button>
        <input type="text" placeholder="Enter staff name here..." className="border p-2 rounded-md w-64" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td><input type="checkbox" /></td>
              <td className="font-semibold">{emp.firstName}</td>
              <td className="font-semibold">{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.role}</td>
              <td><FaTrash className="delete-icon" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
