import React, { useEffect, useState } from "react";
import "./coursedescription.css"
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchCourse, course } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        { headers: { token } }
      );
      if (data.url) window.location.href = data.url;
      else toast.error("Failed to create Payment Session");
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Payment Failed. Please Try again");
    } finally {
      setLoading(false);
    }
  };

  const isEnrolled = user && user.subscription.includes(course?._id);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        course && (
          <div className="cd-page">
            <div className="cd-wrap">
              <div className="cd-eyebrow">
                <div className="cd-eyebrow-line" />
                <span className="cd-eyebrow-text">Course Details</span>
              </div>

              <div className="cd-card">
                {/* ── Hero ── */}
                <div className="cd-hero">
                  <div className="cd-img-wrap">
                    <img src={course.image} alt={course.title} className="cd-img" />
                    <div className="cd-img-overlay" />
                    <span className="cd-badge">✦ Featured</span>
                  </div>

                  <div className="cd-info">
                    <div>
                      <div className="cd-tags">
                        <span className="cd-tag">Online</span>
                        <span className="cd-tag">Certificate</span>
                      </div>

                      <h1 className="cd-title">{course.title}</h1>

                      <div className="cd-meta">
                        {/* Instructor */}
                        <div className="cd-meta-row">
                          <div className="cd-meta-icon">
                            <svg viewBox="0 0 24 24">
                              <circle cx="12" cy="8" r="4" />
                              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="cd-meta-label">Instructor</span>
                            <span className="cd-meta-value">{course.createdBy}</span>
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="cd-meta-row">
                          <div className="cd-meta-icon">
                            <svg viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 7v5l3 3" />
                            </svg>
                          </div>
                          <div>
                            <span className="cd-meta-label">Duration</span>
                            <span className="cd-meta-value">{course.duration} weeks</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="cd-price-row">
                        <span className="cd-price-symbol">₹</span>
                        <span className="cd-price-amount">{course.price}</span>
                        <span className="cd-price-label">one-time payment</span>
                      </div>
                    </div>

                    {/* CTA */}
                    {isEnrolled ? (
                      <button
                        className="cd-btn cd-btn-study"
                        onClick={() => navigate(`/course/study/${course._id}`)}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                        Continue Learning
                      </button>
                    ) : (
                      <button className="cd-btn cd-btn-buy" onClick={checkoutHandler}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Description ── */}
                <div className="cd-desc-section">
                  <div className="cd-desc-sidebar">
                    <span className="cd-desc-sidebar-label">About</span>
                    <div className="cd-desc-sidebar-line" />
                  </div>
                  <p className="cd-desc-text">{course.description}</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default CourseDescription;