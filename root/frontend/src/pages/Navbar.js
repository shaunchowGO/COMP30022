import React from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';
import Login from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faCheck} from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {
  const [loginTrigger, setLogInTrigger] = React.useState(false);
  const [signUpTrigger, setSignUpTrigger] = React.useState(false);
  const [alertValue, setAlertValue] = React.useState({text: 'Alert Template', type: 'success'});

  if (loginTrigger || signUpTrigger) {
    document.body.style.overflowY = 'hidden';
  }
  else {
    document.body.style.overflowY = 'auto';
  }

  function revealAction() {
    var reveals = document.querySelectorAll('.alert')
    reveals[0].classList.add('alert-reveal');
    setTimeout(function() {
      reveals[0].classList.remove('alert-reveal');
    }, 2000);

  }  

  function manageAlert(text, type) {
    setAlertValue({text: text, type: type});
    revealAction();
  }

  return (
    <nav id="navbar">
      <Login trigger={loginTrigger} setLogInTrigger={() => setLogInTrigger(!loginTrigger)} setSignUpTrigger={() => setSignUpTrigger(!signUpTrigger)} setAcademicID={props.setAcademicID} revealAction={revealAction} manageAlert={manageAlert}/>

      <SignUp trigger={signUpTrigger} setSignUpTrigger={() => setSignUpTrigger(!signUpTrigger)} setLogInTrigger={() => setLogInTrigger(!loginTrigger)}/>

      <div className={`alert ${alertValue.type}`}>{alertValue.text} <FontAwesomeIcon icon={faCheck} /></div>
        <div className="nav-left">
          <Link to="/" className="nav-logo"><img src={require("../assets/images/logo.png")}></img></Link>
          <ul className="navs">
              <Link to="/" className="nav-item"><p>Home</p></Link>
              {props.academicID !== null ?
                <Link to="/teacher" className="nav-item"><p>Profile</p></Link>
                :
                <p className="nav-item" onClick={() => setLogInTrigger(!loginTrigger)}>Profile</p>
              }
              {props.academicID !== null ?
                <Link to="/group" className="nav-item"><p>Subjects</p></Link>
                :
                <p className="nav-item" onClick={() => setLogInTrigger(!loginTrigger)}>Subjects</p>
              }
          </ul>
        </div>
        {props.academicID !== null ?
        <div className="nav-right">
          <div className="nav-right-container">
            <p className="username">
              {props.academicID[0].Username}
            </p>
            <Link to="/" className="nav-item">
              <div className="icon" onClick={() => {props.setAcademicID(null); manageAlert("Logout Successful", "success")}}><FontAwesomeIcon icon={faRightFromBracket} /></div>
            </Link>
          </div>
        </div>
        :
        <div className="nav-right">
          <div className="nav-right-container">
              <button className="login-btn" onClick={() => setLogInTrigger(!loginTrigger)}><p>Login</p></button>
              <button className="signup-btn" onClick={() => setSignUpTrigger(!signUpTrigger)}><p>Sign Up</p></button>
          </div>
        </div>
      }
    </nav>
  );
}

export default Navbar;
