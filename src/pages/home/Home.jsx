import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import { UserData } from "../../context/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, loading, isAuth } = UserData();

  if (loading) return <p>Loading...</p>;

  const displayName = isAuth && user ? user.name : "Guest";

  return (
    <div className="home">
      <div className="home-inner">

        <div className="home-hero">
          {/* Left side — text content */}
          <div className="home-left">
            <div className="home-greeting">
              <span className="greeting-wave" />
              Welcome back, {displayName}
            </div>

            <h1 className="home-title">
              Learn. Grow<br /><em>Excel.</em>
            </h1>

            <p className="home-tagline">Your journey starts here.</p>

            <p className="home-desc">
              Access expert-crafted courses, build real skills, and accelerate
              your career — all in one place.
            </p>

            <div className="home-actions">
              <button className="btn-main" onClick={() => navigate("/courses")}>
                Get Started →
              </button>
              <button className="btn-secondary" onClick={() => navigate("/courses")}>
                Browse Courses
              </button>
            </div>
          </div>

          {/* Right side — gif */}
          <div className="home-right">
            <div className="gif-wrapper">
              <img
                src="https://media.tenor.com/4PfFSKZRA48AAAAi/hi-greetings.gif"
                alt="greeting"
                className="hero-gif"
              />
            </div>
          </div>
        </div>

        <div className="home-stats">
          <div className="stat-item">
            <div className="stat-number">2<em>k</em>+</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">48</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">4.<em>9</em></div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>

      </div>
      <Testimonials />
    </div>
  );
};

export default Home;

