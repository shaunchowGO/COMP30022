import React from 'react';
import '../css/Login.css';

function Login(props) {
  return (props.trigger) ? (
        <div id="login">
            <div className="login-container">
                <button className="close-btn" onClick={props.SetSignUpTrigger}>CLOSE</button>
                <h1>LOGO</h1>
                <p>Sign Up</p>
                <form className="login-form">
                    <div className="name-container">
                        <div className="names-input">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="names-input">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="Enter your ID"
                    />

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

                    <label htmlFor="password">Confirm Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Confirm your password"
                    />

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    ) : "";
}

export default Login;
