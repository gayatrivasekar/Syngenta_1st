import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ required for navigation
import "./Sidebar.css";

import Icon1 from "../../assets/icons/1.png";
import Icon2 from "../../assets/icons/2.png";
import Icon3 from "../../assets/icons/3.png";
import Icon4 from "../../assets/icons/4.png";
import Icon5 from "../../assets/icons/5.png";
import Icon6 from "../../assets/icons/6.png";
import Icon7 from "../../assets/icons/7.png";
import Icon8 from "../../assets/icons/8.png";

const Sidebar = () => {
  const navigate = useNavigate(); // ✅ hook to navigate

  const menuItems = [
    { icon: Icon1, label: "Dashboard", path: "/", className: "dash" },
    { icon: Icon2, label: "Dashboard", path: "/catalog" },
    { icon: Icon3, label: "Customer Details", path: "/admin" }, // ✅ goes to CompanyDetails
    { icon: Icon4, label: "Lock in Price", path: "/users" },
    { icon: Icon5, label: "Payment Assessment(In Season)", path: "/settings1" },
    { icon: Icon6, label: "Final Payout Assessment", path: "/settings2" },
    { icon: Icon7, label: "News", path: "/settings3" },
    { icon: Icon8, label: "User Management", path: "/settings4" },
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div
          className="menu-item"
          key={index}
          title={item.label}
          onClick={() => navigate(item.path)} // ✅ navigate on click
        >
          <img
            src={item.icon}
            alt={item.label}
            className={`icon ${item.className || ""}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
