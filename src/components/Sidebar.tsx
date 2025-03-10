import React from "react";
import { FaUsers, FaTh, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react"; // Import signOut function

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
      {/* Logout Icon */}
      <div className="sidebar-icon cursor-pointer text-red-500 hover:text-red-700" 
      // onClick={() => signOut()}
      >
        <FaSignOutAlt size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
