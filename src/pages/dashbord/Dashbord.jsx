import React from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { Link } from "react-router-dom";

const Dashbord = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard">
      <div className="dash-header">
        <h2>My Courses</h2>
        {mycourse && mycourse.length > 0 && (
          <span className="course-count">
            {mycourse.length} enrolled
          </span>
        )}
      </div>

      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="2" y="4" width="18" height="14" rx="3"
                  stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 9h8M7 13h5"
                  stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" />
              </svg>
            </div>
            <p>No courses enrolled yet</p>
            <span>Browse our catalog and start learning today</span>
            <Link to="/courses">Explore Courses</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashbord;