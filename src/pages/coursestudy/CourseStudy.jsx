import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {course && (
        <div className="cs-page">
          <div className="cs-wrap">

            {/* ── Eyebrow ── */}
            <div className="cs-eyebrow">
              <div className="cs-eyebrow-line" />
              <span className="cs-eyebrow-text">Your Course</span>
            </div>

            {/* ── Card ── */}
            <div className="cs-card">

              {/* Hero image */}
              <div className="cs-img-wrap">
                <img src={course.image} alt={course.title} className="cs-img" />
                <div className="cs-img-overlay" />
                <span className="cs-badge">✦ Enrolled</span>
              </div>

              {/* Content */}
              <div className="cs-body">

                <div className="cs-top">
                  <div className="cs-tags">
                    <span className="cs-tag">Online</span>
                    <span className="cs-tag">Certificate</span>
                  </div>

                  <h1 className="cs-title">{course.title}</h1>
                  <p className="cs-desc">{course.description}</p>
                </div>

                {/* Meta */}
                <div className="cs-meta">
                  <div className="cs-meta-row">
                    <div className="cs-meta-icon">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="cs-meta-label">Instructor</span>
                      <span className="cs-meta-value">{course.createdBy}</span>
                    </div>
                  </div>

                  <div className="cs-meta-row">
                    <div className="cs-meta-icon">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 3" />
                      </svg>
                    </div>
                    <div>
                      <span className="cs-meta-label">Duration</span>
                      <span className="cs-meta-value">{course.duration} weeks</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link to={`/lectures/${course._id}`} className="cs-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Go to Lectures
                </Link>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;