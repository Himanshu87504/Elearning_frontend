import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-wrap">
      <div className="about-deco" />

      <div className="about-inner">
        {/* LEFT */}
        <div className="about-left">
          <div className="about-label">Our story</div>

          <h2 className="about-heading">
            <span>About</span> Us.
          </h2>

          <div className="about-accent" />
        </div>

        {/* RIGHT */}
        <div className="about-right">
          <p className="about-body">
            We are dedicated to providing{" "}
            <strong>high quality online courses</strong> to help individuals
            learn and grow in their desired fields. Our experienced instructors
            ensure that each course is tailored for effective learning and
            practical application.
          </p>

          <div className="about-stats">
            <div className="stat">
              <span className="stat-num">200+</span>
              <span className="stat-label">Courses</span>
            </div>

            <div className="stat">
              <span className="stat-num">50k+</span>
              <span className="stat-label">Students</span>
            </div>

            <div className="stat">
              <span className="stat-num">98%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
