import React from "react";
import "./account.css";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";

const DashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const AdminIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged out");
    navigate("/login");
  };

  if (!user) return null;

  const initials = user.name?.charAt(0).toUpperCase() ?? "U";
  const roleLabel = user.role === "admin" ? "Admin" : "Student";

  return (
    <div className="ac-page">
      <div className="ac-card">

        <div className="ac-hero">
          <p className="ac-hero-label">My account</p>
          <div className="ac-avatar-row">
            <div className="ac-avatar">{initials}</div>
            <div>
              <p className="ac-hero-name">{user.name}</p>
              <p className="ac-hero-email">{user.email}</p>
              <div className="ac-role-badge">
                <div className="ac-role-dot" />
                <span>{roleLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ac-body">
          <div className="ac-info-card">
            <div className="ac-info-row">
              <span className="ac-info-key">Name</span>
              <span className="ac-info-val">{user.name}</span>
            </div>
            <div className="ac-info-row">
              <span className="ac-info-key">Email</span>
              <span className="ac-info-val">{user.email}</span>
            </div>
            <div className="ac-info-row">
              <span className="ac-info-key">Role</span>
              <span className="ac-info-val">{roleLabel}</span>
            </div>
          </div>

          <div className="ac-actions">
            <button
              className="ac-btn ac-btn-dash"
              onClick={() => navigate(`/${user._id}/dashboard`)}
            >
              <DashIcon /> My Dashboard
            </button>

            {user.role === "admin" && (
              <button
                className="ac-btn ac-btn-admin"
                onClick={() => navigate("/admin/dashboard")}
              >
                <AdminIcon /> Admin Dashboard
              </button>
            )}

            <div className="ac-divider" />

            <button className="ac-btn ac-btn-logout" onClick={logoutHandler}>
              <LogoutIcon /> Log out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Account;