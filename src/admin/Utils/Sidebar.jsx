import React from "react";
import "./common.css";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";

const Sidebar = () => {
  const { user } = UserData();
  const location = useLocation();

  const menuItems = [
    {
      name: "Home",
      path: "/admin/dashboard",
      icon: <AiFillHome />,
      visible: true,
    },
    {
      name: "Courses",
      path: "/admin/course",
      icon: <FaBook />,
      visible: true,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUserAlt />,
      visible: user?.mainrole === "superadmin",
    },
    {
      name: "Logout",
      path: "/account",
      icon: <AiOutlineLogout />,
      visible: true,
      isLogout: true,
    },
  ];

  const navItems = menuItems.filter((item) => item.visible && !item.isLogout);
  const logoutItem = menuItems.find((item) => item.isLogout);

  return (
    <div className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <span />
        </div>
        <span className="sidebar-brand-name">AdminPanel</span>
      </div>

      <ul>
        {/* Nav links */}
        {navItems.map((item, idx) => (
          <li
            key={idx}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>
              <div className="icon">{item.icon}</div>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}

        {/* Divider */}
        <div className="sidebar-divider" style={{ marginTop: "auto" }} />

        {/* Logout */}
        {logoutItem && (
          <li className="logout-item">
            <Link to={logoutItem.path}>
              <div className="icon">{logoutItem.icon}</div>
              <span>{logoutItem.name}</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;