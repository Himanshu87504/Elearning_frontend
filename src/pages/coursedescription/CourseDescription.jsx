import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
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
      toast.error("Payment Failed. Please Try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        course && (
          <div className="course-description">
            <h3 className="page-title">Course Description</h3>
            <div className="course-header">
              <img src={course.image} alt="Course" className="course-image" />
              <div className="course-info">
                <h2>{course.title}</h2>
                <p><strong>Instructor:</strong> {course.createdBy}</p>
                <p><strong>Duration:</strong> {course.duration} weeks</p>
                <p className="price">₹{course.price}</p>
              </div>
            </div>
            <p className="description">{course.description}</p>

            {user && user.subscription.includes(course._id) ? (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="common-btn"
              >
                Study
              </button>
            ) : (
              <button onClick={checkoutHandler} className="common-btn">
                Buy Now
              </button>
            )}
          </div>
        )
      )}
    </>
  );
};

export default CourseDescription;
