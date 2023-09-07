import React from 'react';
import '../css/Login.css';

function Login(props) {
  return (props.trigger) ? (
        <div id="login">
            <div className="login-container">
                <button className="close-btn" onClick={props.SetLogInTrigger}>CLOSE</button>
                <h1>LOGO</h1>
                <p>Login To Continue</p>
                <form className="login-form">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />

                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    ) : "";
}

export default Login;
