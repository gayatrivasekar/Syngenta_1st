import React from "react";
import "./Sidebar.css";

// Importing all icons
import Icon1 from "../../assets/icons/1.png";
import Icon2 from "../../assets/icons/2.png";
import Icon3 from "../../assets/icons/3.png";
import Icon4 from "../../assets/icons/4.png";
import Icon5 from "../../assets/icons/5.png";
import Icon6 from "../../assets/icons/6.png";
import Icon7 from "../../assets/icons/7.png";
import Icon8 from "../../assets/icons/8.png";

const Sidebar = () => {
  const menuItems = [
    { icon: Icon1, label: "Dashboard", className: "dash" },
    { icon: Icon2, label: "Catalog" },
    { icon: Icon3, label: "Admin" },
    { icon: Icon4, label: "Users" },
    { icon: Icon5, label: "Settings" },
    { icon: Icon6, label: "Settings" },
    { icon: Icon7, label: "Settings" },
    { icon: Icon8, label: "Settings" },
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div className="menu-item" key={index} title={item.label}>
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
