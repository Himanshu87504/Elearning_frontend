import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.mainrole !== "superadmin") {
    navigate("/");
    return null;
  }

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = async (id) => {
    if (!confirm("Are you sure you want to update this user's role?")) return;
    setUpdatingId(id);
    try {
      const { data } = await axios.put(
        `${server}/api/user/${id}`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success(data.message);
      fetchUsers();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const initials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "?";

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <Layout>
      <div className="au-page">

        {/* Header */}
        <div className="au-header">
          <div>
            <h1 className="au-title">All <em>Users</em></h1>
            <p className="au-sub">
              {users.length} total &nbsp;·&nbsp; {adminCount} admin{adminCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="au-search-wrap">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="9" r="6" /><path d="M15 15l-3-3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="au-search"
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="au-stats">
          <div className="au-stat">
            <span className="au-stat-num">{users.length}</span>
            <span className="au-stat-label">Total</span>
          </div>
          <div className="au-stat">
            <span className="au-stat-num">{adminCount}</span>
            <span className="au-stat-label">Admins</span>
          </div>
          <div className="au-stat">
            <span className="au-stat-num">{users.length - adminCount}</span>
            <span className="au-stat-label">Users</span>
          </div>
        </div>

        {/* Table */}
        <div className="au-table-wrap">
          {loading ? (
            <div className="au-loading">
              <span className="au-spinner" />
              <p>Loading users…</p>
            </div>
          ) : filtered.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th className="au-col-num">#</th>
                  <th className="au-col-user">User</th>
                  <th className="au-col-role">Role</th>
                  <th className="au-col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u._id}>
                    <td className="au-num">{i + 1}</td>
                    <td>
                      <div className="au-name-cell">
                        <div className={`au-avatar au-avatar--${u.role === "admin" ? "admin" : "user"}`}>
                          {initials(u.name)}
                        </div>
                        <div className="au-name-info">
                          <p className="au-name">{u.name}</p>
                          <p className="au-email">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`au-badge au-badge--${u.role === "admin" ? "admin" : "user"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="au-btn"
                        onClick={() => updateRole(u._id)}
                        disabled={updatingId === u._id}
                        title="Update Role"
                      >
                        {updatingId === u._id ? (
                          <span className="au-spinner au-spinner--sm" />
                        ) : (
                          /* shield / role swap icon */
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="au-btn-icon">
                            <path d="M10 2L4 5v5c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V5l-6-3z" strokeLinejoin="round" />
                            <path d="M7.5 10l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        <span className="au-btn-label">Update Role</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="au-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
              </svg>
              <p>{search ? `No users matching "${search}"` : "No users found"}</p>
              {search && (
                <button className="au-clear-btn" onClick={() => setSearch("")}>Clear search</button>
              )}
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
};

export default AdminUsers;
