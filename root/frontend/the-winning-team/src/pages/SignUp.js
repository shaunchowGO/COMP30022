import React from 'react';
import '../css/SignUp.css';

function Login(props) {
  return (props.trigger) ? (
        <div id="sign-up">
            <div className="login-container">
                <button className="close-btn" 
                    onClick={props.SetSignUpTrigger}>
                    <img className="close-icon" src={require(`../assets/images/close_icon.jpeg`)} />
                </button>
                <h1 className='logo'>TextDNA</h1>
                <p>SIGN UP</p>
                <form className="login-form">
                    <div className="name-container">
                        <div className="names-input">
                            <label htmlFor="firstName">First Name<span className="red">*</span></label>
                            <input 
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="names-input">
                            <label htmlFor="lastName">Last Name<span className="red">*</span></label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>
                    <label htmlFor="id">ID<span className="red">*</span></label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="Enter your ID"
                    />

                    <label htmlFor="email">Email Address<span className="red">*</span></label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                    />

                    <label htmlFor="password">Password<span className="red">*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />

                    <label htmlFor="password">Confirm Password<span className="red">*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Confirm your password"
                    />

                    <p className='already-user-txt'>Already a user? <a className="last-word-button">LOGIN</a>.</p>

                    
                    
                    <button className = "submit-btn" type="submit">SIGN UP</button>
                </form>
            </div>
        </div>
    ) : "";
}

export default Login;
