import React from 'react';
import '../css/popups/SignUp.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from '@fortawesome/free-solid-svg-icons';

function SignUp(props) {
  return (props.trigger) ? (
        <div id="sign-up">
            <div className="login-container">
                <button className="close-btn" 
                    onClick={props.SetSignUpTrigger}>
                    <FontAwesomeIcon className="close-icon" icon={faXmark} />
                </button>
                <h1 className='logo'>TextDNA</h1>
                <p>Create Your Profile</p>
                <form className="login-form">
                    <div className="name-container">
                        <div className="names-input">
                            <label htmlFor="firstName">First Name<span className="required-field">*</span></label>
                            <input 
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="names-input">
                            <label htmlFor="lastName">Last Name<span className="required-field">*</span></label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>
                    
                    <label htmlFor="id">Academin ID<span className="required-field">*</span></label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="Enter your ID"
                    />

                    <label htmlFor="email">Email Address<span className="required-field">*</span></label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                    />

                    <label htmlFor="password">Password<span className="required-field">*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />

                    <label htmlFor="password">Confirm Password<span className="required-field">*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Confirm your password"
                    />

                    <button className = "blue-btn" type="submit">SIGN UP</button>
                    <p className='user-text'>Already a user? <a className="underline-text" onClick={() => {props.SetLogInTrigger();props.SetSignUpTrigger();}}>LOGIN</a>.</p>
                </form>
            </div>
        </div>
    ) : "";
}

export default SignUp;
