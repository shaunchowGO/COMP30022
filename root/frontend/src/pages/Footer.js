import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <ul>
          <h3>Company</h3>
          <li>About Us</li>
          <li>Our Products</li>
          <li>Blog</li>
          <li>Media</li>
        </ul>
        <ul>
          <h3>Pages</h3>
          <li>Home</li>
          <li>Profile</li>
          <li>Subjects</li>
          <li>Assignments</li>
          <li>Student Profiles</li>
        </ul>
        <ul>
          <h3>Support</h3>
          <li>Help</li>
          <li>System Status </li>
          <li>Support Center</li>
        </ul>
        <img className="logo" src={require("../assets/images/logo.png")}></img>
      </div>
      <div className="copyright">
        <p>© 2023 TextDNA, LLC. All rights reserved.</p>
        <div className="terms">
          <p>Terms of Service</p>
          <div className="divider">|</div>
          <p>Privacy Policy</p>
          <div className="divider">|</div>
          <p>Cookies Settings</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
