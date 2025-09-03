import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

const Header = ({ isAuth }) => {
  return (
    <header>

      <div className="logo">E-Learning</div>
      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        {isAuth ? (
          <Link to={"/account"}> Account </Link>
          // <MdAccountCircle className="icon-large" /
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
