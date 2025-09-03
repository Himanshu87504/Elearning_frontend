
import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import { UserData } from "../../context/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, loading, isAuth } = UserData(); // Destructure context values

  // Handle loading state
  if (loading) {
    return <p>Loading...</p>; // Display a loading message or spinner
  }

  // Display the user's name if authenticated, otherwise show "Guest"
  const displayName = isAuth && user ? user.name : "Guest";
  // const User =user.email; add condition other wise give error
  // console.log(user); direct object use not allowed


  return (
    <div>
      <div className="home">
        <h1>Welcome, {displayName}</h1>
        {/* <h1>{User}!</h1> */}
        {/* Use displayName for a friendly greeting */}

        <div className="home-content">
          <h1>Welcome to our E-learning Platform</h1>
          <p>Learn, Grow, Excel</p>
          <button onClick={() => navigate("/courses")} className="common-btn">
            Get Started
          </button>
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
