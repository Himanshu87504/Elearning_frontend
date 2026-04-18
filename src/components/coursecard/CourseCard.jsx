import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const isSubscribed = user?.subscription?.includes(course._id);
  const isAdmin = user?.role === "admin";

  return (
    <div className="course-card">
      <div className="card-img-wrap">
        <img src={course.image} alt={course.title} className="course-image" />
        {course.price === 0 && <span className="card-pill pill-free">Free</span>}
        <span className="card-duration">⏱ {course.duration} weeks</span>
      </div>

      <div className="card-body">
        <div class="card-meta-top">
          <span className="card-category">{course.category || "Course"}</span>
        </div>

        <h3 className="card-title">{course.title}</h3>
        <p className="card-instructor">by <strong>{course.createdBy}</strong></p>

        <div className="card-divider" />

        <div className="card-footer">
          <div className="card-price">
            {course.price === 0 ? (
              <>
                <span className="price-value free-price">Free</span>
                <span className="price-label">always</span>
              </>
            ) : (
              <>
                <span className="price-value">₹{course.price}</span>
                <span className="price-label">one-time</span>
              </>
            )}
          </div>

          {isAuth ? (
            isAdmin ? (
              <button className="card-btn btn-study" onClick={() => navigate(`/course/study/${course._id}`)}>
                ▶ Study
              </button>
            ) : isSubscribed ? (
              <button className="card-btn btn-study" onClick={() => navigate(`/course/study/${course._id}`)}>
                ▶ Study
              </button>
            ) : (
              <button className="card-btn btn-primary" onClick={() => navigate(`/course/${course._id}`)}>
                Get Started →
              </button>
            )
          ) : (
            <button className="card-btn btn-primary" onClick={() => navigate("/login")}>
              Get Started →
            </button>
          )}
        </div>

        {isAdmin && (
          <div className="card-delete">
            <button className="btn-delete" onClick={() => deleteHandler(course._id)}>
              🗑 Delete Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;