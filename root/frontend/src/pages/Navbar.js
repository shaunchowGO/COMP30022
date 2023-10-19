import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import Login from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const [loginTrigger, setLogInTrigger] = React.useState(false);
  const [signUpTrigger, setSignUpTrigger] = React.useState(false);

	if (loginTrigger || signUpTrigger) {
		document.body.style.overflowY = "hidden";
	} else {
		document.body.style.overflowY = "auto";
	}

  return (
    <nav id="navbar">
      <Login
        trigger={loginTrigger}
        setLogInTrigger={() => setLogInTrigger(!loginTrigger)}
        setSignUpTrigger={() => setSignUpTrigger(!signUpTrigger)}
        setAcademicID={props.setAcademicID}
        manageAlert={props.manageAlert}
      />

      <SignUp
        trigger={signUpTrigger}
        setSignUpTrigger={() => setSignUpTrigger(!signUpTrigger)}
        setLogInTrigger={() => setLogInTrigger(!loginTrigger)}
        manageAlert={props.manageAlert}
      />

      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src={require("../assets/images/logo.png")}></img>
        </Link>
        <ul className="navs">
          <Link to="/" className="nav-item">
            <p>Home</p>
          </Link>

          {props.academicID !== null ? (
            <Link to="/teacher" className="nav-item">
              <p>Profile</p>
            </Link>
          ) : (
            <p
              className="nav-item"
              onClick={() => setLogInTrigger(!loginTrigger)}
            >
              Profile
            </p>
          )}

        </ul>
      </div>

      {props.academicID !== null ? (
        <div className="nav-right">
          <div className="nav-right-container">
            <p className="username">{props.academicID[0].Username}</p>
            <Link to="/" className="nav-item">
              <div
                className="icon"
                onClick={() => {
                  props.setAcademicID(null);
                  props.manageAlert("Logout Successful", "success");
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="nav-right">
          <div className="nav-right-container">
            <button
              className="login-btn"
              onClick={() => setLogInTrigger(!loginTrigger)}
            >
              <p>Login</p>
            </button>
            <button
              className="signup-btn"
              onClick={() => setSignUpTrigger(!signUpTrigger)}
            >
              <p>Sign Up</p>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
