import React from 'react';
import '../css/popups/Login.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown.js';


function Login(props) {
    const teacherData = {
        details: [
          {
            id: 129312,
            name: "Eduardo Riveria",
          },
          {
            id: 1122388,
            name: "Jane Doe",
          },
          {
            id: 1167144,
            name: "Thaya Chevaphatrakul",
          },
        ],
      }
    return (props.trigger) ? (
        <div id="login">
            <div className="login-container">
                <button className="close-btn" 
                    onClick={props.SetLogInTrigger}>
                    <FontAwesomeIcon className="close-icon" icon={faXmark} />
                </button>
                <h1 className='logo'>TextDNA</h1>
                <p>Login To Continue</p>
                <form className="login-form">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />

                    <div className='button-container'>
                        <a className="forgot-password">Forgot Password?</a>
                        <button className="blue-btn" type="submit">SIGN IN</button>
                    </div>

                    
                </form>
                <div className="login-breaker"> 
                    <span className="breaker"></span>
                    <p className='or'>OR</p>
                    <span className="breaker"></span>
                </div>
                <div className='below-or'>
                    <button className='google-sso-button'> 
                        <img className = "google-img" src= {require(`../assets/images/icons/google_icon.png`)} /> 
                        GOOGLE
                    </button>
                    <button className='google-sso-button'>
                        <img className = "SSO-img" src= {require(`../assets/images/icons/SSO_icon.png`)} />
                        SSO
                        </button>
                    <p className='user-text'> New User? <a class="underline-text" 
                        onClick={() => {props.SetLogInTrigger();props.SetSignUpTrigger();}}>SIGN UP</a></p>
                </div>
                <Dropdown data={teacherData.details}/>
            </div>
        </div>
    ) : "";
}

export default Login;
