import React from 'react';
import '../css/popups/Login.css';

function Login(props) {
  return (props.trigger) ? (
        <div id="login">
            <div className="login-container">
                <button className="close-btn" 
                    onClick={props.SetLogInTrigger}>
                    <img className="close-icon" src={require(`../assets/images/icons/close_icon.jpeg`)} /> 
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
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
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
                    <p className='new-user-text'> New User? <a class="underline-text">SIGN UP</a></p>
                </div>
            </div>
        </div>
    ) : "";
}

export default Login;
