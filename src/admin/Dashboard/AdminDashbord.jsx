import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";

const CourseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const LectureIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6.5 5.5l4 2.5-4 2.5V5.5Z" fill="currentColor" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M1.5 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M11 7c1.1 0 2 .9 2 2M13 13c0-1.1-.9-2-2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = 0;
    const steps = 30;
    const increment = Math.ceil(target / steps);
    const interval = duration / steps;
    const timer = setInterval(() => {
      start = Math.min(start + increment, target);
      setValue(start);
      if (start >= target) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

const StatCard = ({ label, value, sub, colorClass, icon, onClick }) => {
  const animatedValue = useCountUp(value);
  return (
    <div className={`stat-card ${colorClass}`} onClick={onClick}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value ? animatedValue.toLocaleString() : "—"}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
};

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  const [stats, setStats] = useState({});

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: { token: localStorage.getItem("token") },
      });
      setStats(data.stats);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="dash-root">
        <div className="dash-header">
          <span className="dash-title">Admin Dashboard</span>
          <span className="dash-badge">Admin</span>
        </div>

        <div className="stats-grid">
          <StatCard
            label="Total Courses"
            value={stats.totalCourses}
            sub="Active & published"
            colorClass="purple"
            icon={<CourseIcon />}
            onClick={() => navigate("/admin/course")}
          />
          <StatCard
            label="Total Lectures"
            value={stats.totalLectures}
            sub="Across all courses"
            colorClass="teal"
            icon={<LectureIcon />}
            onClick={() => navigate("/courses")}
          />
          <StatCard
            label="Total Users"
            value={stats.totalUsers}
            sub="Registered accounts"
            colorClass="coral"
            icon={<UserIcon />}
            onClick={() => navigate("/admin/users")}
          />
        </div>

        <div className="section-title">Recent Activity</div>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-dot purple" />
            New course added — <em>React Fundamentals</em>
            <span className="activity-time">2 min ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-dot teal" />
            Lecture uploaded — <em>Hooks deep dive</em>
            <span className="activity-time">14 min ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-dot coral" />
            New user registered — <em>priya@example.com</em>
            <span className="activity-time">1 hr ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-dot purple" />
            Course updated — <em>Node.js Masterclass</em>
            <span className="activity-time">3 hr ago</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;