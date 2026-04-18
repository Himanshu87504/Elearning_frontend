import React from "react";
import "./footer.css";
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer-wrap">

      <div className="footer-inner">

        <div className="footer-top">

          <div className="footer-brand">
            <p className="footer-logo">E·Learn</p>
            <p className="footer-tagline">
              Empowering individuals through high quality online education,
              crafted for real-world growth.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Facebook">
                <AiFillFacebook />
              </a>
              <a href="#" className="social-btn" aria-label="Twitter">
                <AiFillTwitterSquare />
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <AiFillInstagram />
              </a>
            </div>
          </div>

          <div>
            <p className="footer-col-title">Explore</p>
            <ul className="footer-links">
              <li><a href="#">All Courses</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Instructors</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2024 E·Learn. All rights reserved.</p>
          <span className="footer-heart">
            Made with <span className="heart-icon">♥</span> by{" "}
            <a href="#">Himanshu</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;