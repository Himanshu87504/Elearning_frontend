import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";

const Header = ({ isAuth, userName = "Himanshu" }) => {
  const { pathname } = useLocation();
  const initials = userName.slice(0, 1).toUpperCase();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/about", label: "About" },
  ];

  return (
    <>
      <header className="hv2-wrap">
        <div className="hv2-inner">

          {/* Logo */}
          <Link to="/" className="hv2-logo" onClick={closeMenu}>
            <span className="hv2-logo-serif">E</span>
            <div className="hv2-logo-dot" />
            <span className="hv2-logo-sans">Learning</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hv2-nav">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`hv2-link ${pathname === path ? "active" : ""}`}
              >
                {label}
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

          {/* ── Hamburger button ── */}
          <button
            className={`hv2-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hv2-hline" />
            <span className="hv2-hline" />
            <span className="hv2-hline" />
          </button>

        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div className={`hv2-mobile-menu${menuOpen ? " open" : ""}`}>
        <nav className="hv2-mobile-nav">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`hv2-mobile-link ${pathname === path ? "active" : ""}`}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hv2-mobile-footer">
          {isAuth ? (
            <Link to="/account" className="hv2-mobile-account" onClick={closeMenu}>
              <div className="hv2-avatar">{initials}</div>
              <span className="hv2-account-label">{userName}</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="hv2-mobile-login" onClick={closeMenu}>Log in</Link>
              <Link to="/register" className="hv2-mobile-cta" onClick={closeMenu}>Get started</Link>
            </>
          )}
        </div>
      </div>

      {/* ── Backdrop overlay ── */}
      <div
        className={`hv2-overlay${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
      />
    </>
  );
};

export default Header;
