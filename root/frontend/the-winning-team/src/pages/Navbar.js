import React from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';
import Login from '../pages/LogIn'
import SignUp from '../pages/SignUp'

function Navbar() {
  const [LogInTrigger, SetLogInTrigger] = React.useState(false);
  const [SignUpTrigger, SetSignUpTrigger] = React.useState(false);
  return (
    <nav id="navbar">
      <Login trigger={LogInTrigger} SetLogInTrigger={() => SetLogInTrigger(!LogInTrigger)}/>
      <SignUp trigger={SignUpTrigger} SetSignUpTrigger={() => SetSignUpTrigger(!SignUpTrigger)}/>
        <div className="nav-left">
          <h1>TextDNA</h1>
          <ul className="navs">
              <Link to="/student" className="nav-item">PROFILE</Link>
              <Link to="/group" className="nav-item">GROUP</Link>
              <Link to="/" className="nav-item">HELP</Link>
          </ul>
        </div>
        <div className="nav-right">
          <div className="btn-container">
              <button className="login-btn" onClick={() => SetLogInTrigger(!LogInTrigger)}>LOGIN</button>
              <button className="signup-btn" onClick={() => SetSignUpTrigger(!SignUpTrigger)}>CREATE ACCOUNT</button>
          </div>
        </div>
    </nav>
  );
}

export default Navbar;
