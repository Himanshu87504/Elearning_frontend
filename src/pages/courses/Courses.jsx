import React from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div className="courses">
      <div className="courses-header">
        <div className="courses-eyebrow">
          <span className="eyebrow-dot" />
          Explore &amp; Learn
        </div>
        <h2 className="courses-title">
          Available <em>Courses</em>
        </h2>
        <p className="courses-subtitle">
          Handcrafted lessons to help you grow — at your own pace, on your own terms.
        </p>
        <div className="header-rule">
          <div className="rule-line" />
          <div className="rule-diamond" />
          <div className="rule-line" />
        </div>
      </div>

      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <div className="no-courses">
            <div className="no-courses-icon">📭</div>
            <h4>No Courses Yet</h4>
            <p>Check back soon — new courses are on their way.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
