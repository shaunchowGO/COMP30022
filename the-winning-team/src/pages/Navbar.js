import React from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <nav id="navbar">
        <div className="nav-left">
          <h1>LOGO</h1>
          <ul className="navs">
              <Link to="/student" className="home-nav">PROFILE</Link>
              <Link to="/group" className="nav-item">GROUP</Link>
              <Link to="/" className="nav-item">HELP</Link>
          </ul>
        </div>
        <div className="nav-right">
            <a href="#">LOGIN</a>
            <a href="#">CREATE ACCOUNT</a>
        </div>
    </nav>
  );
}

export default Navbar;
