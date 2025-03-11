import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaArrowLeft, FaArrowRight, FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// Define Employee type
type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};

const Employee = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/add-employee");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Normalize field names
        const formattedData = data.map((emp: any) => ({
          _id: emp._id,
          firstName: emp.firstName || emp.firstname || "", // Handle different cases
          lastName: emp.lastName || emp.lastname || "",
          email: emp.email,
          phone: emp.phone,
          role: emp.role
        }));

        setEmployees(formattedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <button onClick={() => signIn()}>Sign in</button>;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(searchTerm) ||
      emp.lastName.toLowerCase().includes(searchTerm) ||
      emp.email.toLowerCase().includes(searchTerm)
  );

  // Handle checkbox selection
  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };

  // Handle role change
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  // Update employee roles in MongoDB & UI
  const handleUpdateRole = async () => {
    if (!selectedRole || selectedEmployees.length === 0) {
      alert("Select employees and a role first.");
      return;
    }

    try {
      const response = await fetch("/api/update-employee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeIds: selectedEmployees,
          newRole: selectedRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      // Update role in the local state
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          selectedEmployees.includes(emp._id) ? { ...emp, role: selectedRole } : emp
        )
      );

      setSelectedEmployees([]);
      setSelectedRole("");

      alert("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role.");
    }
  };

  const handleDelete = async (employeeId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch("/api/delete-employee", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: employeeId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
  
      // Remove employee from UI after successful deletion
      setEmployees((prev) => prev.filter((emp) => emp._id !== employeeId));
  
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="table-containers ml-16">
          <div className="flex justify-between items-center px-6">
            <h2 className="text-2xl font-bold mb-4 ml-4">Employees</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
              onClick={() => router.push("/AddEmployee")}
            >
              Add New
            </button>
          </div>

          <div className="table-container flex justify-between items-center px-6">
            <h2 className="text-2xl font-bold mb-4 ml-4">Josh Bakery Ventures</h2>
            <p className="text-gray-600 text-sm ml-4">
              123 Baker Street, Nairobi, Kenya
            </p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <select className="border p-2 rounded-md" onChange={handleRoleChange}>
                <option value="">Change role</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </select>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleUpdateRole}
              >
                Change
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter staff name here..."
                  className="border p-2 pl-10 rounded-md w-64"
                  onChange={handleSearch}
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-500">1 of 2</span>
              <button className="text-green-500">
                <FaArrowLeft />
              </button>
              <button className="text-green-500">
                <FaArrowRight />
              </button>
            </div>
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
            {filteredEmployees.map((emp) => (
                <tr key={emp._id} className="table-container hover:bg-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp._id)}
                      onChange={() => handleCheckboxChange(emp._id)}
                    />
                  </td>
                  <td className="font-semibold">{emp.firstName}</td>
                  <td className="font-semibold">{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.role}</td>
                  <td>
                    <FaTrash
                      className="delete-icon cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(emp._id)}
                    />
                  </td>
                  <td>
                    <FaEdit
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => router.push(`/EditEmployee?id=${emp._id}`)}
                    />
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
