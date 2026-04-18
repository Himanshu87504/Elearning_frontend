import React from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";

const Header = ({ isAuth, userName = "Himanshu" }) => {
  const { pathname } = useLocation();
  const initials = userName.slice(0, 1).toUpperCase();

  return (
    <header className="hv2-wrap">
      <div className="hv2-inner">

        <Link to="/" className="hv2-logo">
          <span className="hv2-logo-serif">E</span>
          <div className="hv2-logo-dot" />
          <span className="hv2-logo-sans">Learning</span>
        </Link>

        <nav className="hv2-nav">
          {["/", "/courses", "/about"].map((path, i) => (
            <Link
              key={path}
              to={path}
              className={`hv2-link ${pathname === path ? "active" : ""}`}
            >
              {["Home", "Courses", "About"][i]}
            </Link>
          ))}

          <div className="hv2-pill-wrap">
            {isAuth ? (
              <Link to="/account" className="hv2-account">
                <div className="hv2-avatar">{initials}</div>
                <span className="hv2-account-label">{userName}</span>
                <svg className="hv2-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 7l3 3 3-3" />
                </svg>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hv2-login">Log in</Link>
                <Link to="/register" className="hv2-cta">Get started</Link>
              </>
            )}
          </div>
        </nav>

      </div>
    </header>
  );
};

export default Header;