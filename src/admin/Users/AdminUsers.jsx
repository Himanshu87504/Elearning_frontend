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

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (!confirm("Are you sure you want to update this user's role?")) return;
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
    }
  };

  // Initials helper
  const initials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2) : "?";

  return (
    <Layout>
      <div className="users">
        <h1 className="heading">All Users</h1>

        <div className="users-table-wrap">
          {users && users.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Role</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="user-name-cell">
                        <div className="user-avatar">{initials(u.name)}</div>
                        {u.name}
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role === "admin" ? "admin" : "user"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="update-role-btn"
                        onClick={() => updateRole(u._id)}
                      >
                        Update Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="users-empty">No users found</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
