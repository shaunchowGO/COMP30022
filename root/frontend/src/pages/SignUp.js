import React from 'react';
import '../css/popups/SignUp.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { compareLoginData, createNewAccount, createAcademicProfile } from '../utils/api';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import BeatLoader from "react-spinners/BeatLoader";

function SignUp(props) {
    const [formData, setFormData] = React.useState({ firstName: '', lastName: '', email: '', password: '', cpassword: '', aId: ''});
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        // Check if password matches
        if (formData.password == formData.cpassword) {
            try {
                // Check if the email already exist in db  
              const loginInfo = await compareLoginData(formData.email);
              console.log('Retrieving Login Data...');
                if (loginInfo === 'new') {
                    try {
                        const newAccount = await createNewAccount(formData);
                        console.log(newAccount);
                        const newAcademic = await createAcademicProfile(formData);
                        console.log(newAcademic);
                        setIsLoading(false);
                        props.manageAlert('Sign up successful', 'success');
                        props.setSignUpTrigger();
                    } catch (error) {
                        console.error('Fail to insert', error);
                        setIsLoading(false);
                    }
                }
                else {
                    props.manageAlert('Email already in use', 'fail');
                    setIsLoading(false);
                }
            } catch (error) {
              console.error('Error fetching data:', error);
              setIsLoading(false);
            }
        }
        else {
            props.manageAlert('Passwords mismatch', 'fail');
            setIsLoading(false);
        }
    };
    


    return (props.trigger) ? (
        <div id="sign-up">
            <div id="top" className="login-container">
                <button className="close-btn" 
                    onClick={props.setSignUpTrigger}>
                    <FontAwesomeIcon className="close-icon" icon={faXmark} />
                </button>
                <div className="signup-header">
                    <img className="logo" src={require("../assets/images/logo.png")}></img>
                    <p>Create Your Profile</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="name-container">
                        <div className="names-input">
                            <label htmlFor="firstName">First Name<span className="required-field">*</span></label>
                            <input 
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="names-input">
                            <label htmlFor="lastName">Last Name<span className="required-field">*</span></label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <label htmlFor="id">Academic ID<span className="required-field">*</span></label>
                    <input
                        type="text"
                        id="aId"
                        name="aId"
                        placeholder="Enter your ID"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="email">Email Address<span className="required-field">*</span></label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password<span className="required-field">*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Confirm Password<span className="required-field">*</span></label>
                    <input
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        placeholder="Confirm your password"
                        required
                        onChange={handleChange}
                    />

                    <div className='button-container'>
                        {isLoading ? 
                            <BeatLoader className="loading-icon" color="#7179e7" />
                        :
                        <button className = "blue-btn" type="submit">SIGN UP</button>
                        }
                    </div>
                    <p className='user-text'>Already a user? <a className="underline-text" onClick={() => {props.setLogInTrigger();props.setSignUpTrigger();}}>LOGIN</a>.</p>
                </form>
            </div>
        </div>
    ) : "";
}

export default SignUp;
