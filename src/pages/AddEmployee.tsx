"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";

const AddEmployee = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Staff",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Employee Added:", formData);
    router.push("/employees");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="input-field"
          required
        />
        <select name="role" value={formData.role} onChange={handleChange} className="input-field">
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
          Add Employee
        </button>
      </form>
      <button
        onClick={() => router.push("/employees")}
        className="mt-4 text-gray-600 underline"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddEmployee;
