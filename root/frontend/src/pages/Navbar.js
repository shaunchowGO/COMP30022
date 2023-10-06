import React from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';
import Login from '../pages/LogIn'
import SignUp from '../pages/SignUp'

function Navbar() {
  const [LogInTrigger, SetLogInTrigger] = React.useState(false);
  const [SignUpTrigger, SetSignUpTrigger] = React.useState(false);

  if (LogInTrigger || SignUpTrigger) {
    document.body.style.overflowY = 'hidden';
  }
  else {
    document.body.style.overflowY = 'auto';
  }

  return (
    <nav id="navbar">
      <Login trigger={LogInTrigger} SetLogInTrigger={() => SetLogInTrigger(!LogInTrigger)} SetSignUpTrigger={() => SetSignUpTrigger(!SignUpTrigger)}/>
      <SignUp trigger={SignUpTrigger} SetSignUpTrigger={() => SetSignUpTrigger(!SignUpTrigger)} SetLogInTrigger={() => SetLogInTrigger(!LogInTrigger)}/>
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
              <button className="login-btn" onClick={() => SetLogInTrigger(!LogInTrigger)}><p>Login</p></button>
              <button className="signup-btn" onClick={() => SetSignUpTrigger(!SignUpTrigger)}><p>Sign Up</p></button>
          </div>
        </div>
    </nav>
  );
}

export default Navbar;
