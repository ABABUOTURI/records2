// src/components/Sidebar.tsx
import React from "react";
import { FaUsers, FaTh, FaWallet } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-icon">
        <FaTh size={24} />
      </div>
      <div className="sidebar-icon">
        <FaUsers size={24} />
      </div>
      <div className="sidebar-icon">
        <FaWallet size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
