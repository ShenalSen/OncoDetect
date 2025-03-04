import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import img3 from "../assets/logo.png"; // Ensure correct path

const LSideBar = () => {
  const location = useLocation();
  
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center justify-center p-6">
        <img src={img3} className="w-8 h-8 mr-2" alt="Logo" />
        <h1 className="text-xl font-bold text-purple-700">Onco</h1> 
        <h1 className="text-xl font-bold text-gray-700">detect</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-6 p-4">
        <NavItem icon={<RxDashboard size={20} />} label="Dashboard" to="/" isActive={location.pathname === "/"} />
        <NavItem icon={<BsClockHistory size={20} />} label="Past Predictions" to="/past-predictions" isActive={location.pathname === "/past-predictions"} />
        <NavItem icon={<FaUserMd size={20} />} label="Doctor" to="/doctor" isActive={location.pathname === "/doctor"} />
        <NavItem icon={<TbReportMedical size={20} />} label="Reports" to="/reports" isActive={location.pathname === "/reports"} />
        <NavItem icon={<AiOutlineSetting size={20} />} label="Settings" to="/settings" isActive={location.pathname === "/settings"} />
        <NavItem icon={<AiOutlineLogout size={20} />} label="Logout" to="/logout" isActive={location.pathname === "/logout"} />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, to, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer ${isActive ? "bg-purple-200 text-purple-700" : "text-gray-700 hover:bg-gray-100"}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default LSideBar;
