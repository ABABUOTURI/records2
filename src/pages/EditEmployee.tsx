import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditEmployee = () => {
  const router = useRouter();
  const { id } = router.query; // Get employee ID from URL

  interface Employee {
    firstName: string;
    lastName: string;
    phone: string;
  }
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Fetch Employee Data
  useEffect(() => {
    if (!id || typeof id !== "string") return; // Ensure ID is valid
  
    const fetchEmployee = async () => {
      try {
        console.log(`Fetching employee with ID: ${id}`);
  
        const res = await fetch(`/api/get-employee?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch employee");
  
        const data = await res.json();
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
  
    fetchEmployee();
  }, [id]);
  
  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmployee((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  // Handle Form Submission (Update Employee Data)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      console.error("Employee ID is missing.");
      return;
    }
  
    try {
      console.log("Updating employee:", employee);
  
      const res = await fetch(`/api/update-employee`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...employee }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Failed to update employee");
      }
  
      alert("Employee updated successfully!");
      router.push("/Employee"); // Redirect to employee list
    } catch (error) {
      console.error("Error updating employee:", error);
    //   alert(error.message); // Show the error to the user
    }
  };
  
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          First Name:
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </label>

        <label className="block mb-2">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </label>

        <label className="block mb-2">
          Phone:
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
