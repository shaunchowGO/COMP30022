import React from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';
import Login from '../pages/LogIn'
import SignUp from '../pages/SignUp'

function Navbar(props) {
  const [loginTrigger, setLogInTrigger] = React.useState(false);
  const [signUpTrigger, setSignUpTrigger] = React.useState(false);

  if (loginTrigger || signUpTrigger) {
    document.body.style.overflowY = 'hidden';
  }
  else {
    document.body.style.overflowY = 'auto';
  }

  return (
    <nav id="navbar">
      <Login trigger={loginTrigger} setLogInTrigger={() => setLogInTrigger(!loginTrigger)} setSignUpTrigger={() => setSignUpTrigger(!signUpTrigger)} setAcademicID={props.setAcademicID}/>
      <SignUp trigger={signUpTrigger} setSignUpTrigger={() => setSignUpTrigger(!signUpTrigger)} setLogInTrigger={() => setLogInTrigger(!loginTrigger)}/>
        <div className="nav-left">
          <Link to="/" className="nav-logo"><img src={require("../assets/images/logo.png")}></img></Link>
          <ul className="navs">
              <Link to="/" className="nav-item"><p>Home</p></Link>
              <Link to="/teacher" className="nav-item"><p>Profile</p></Link>
              <Link to="/group" className="nav-item"><p>Subjects</p></Link>
          </ul>
        </div>
        <div className="nav-right">
          <div className="btn-container">
              <button className="login-btn" onClick={() => setLogInTrigger(!loginTrigger)}><p>Login</p></button>
              <button className="signup-btn" onClick={() => setSignUpTrigger(!signUpTrigger)}><p>Sign Up</p></button>
          </div>
        </div>
    </nav>
  );
}

export default Navbar;
