import React from 'react';
import '../css/popups/Login.css';
import { getAllTeacherProfile } from '../utils/api';
import { getLoginData } from '../utils/api';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const [formData, setFormData] = React.useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
          const loginInfo = await getLoginData(formData.email, formData.password);
          console.log('Retrieving Login Data...');
            if (loginInfo[0] != null) {
              props.setAcademicID(loginInfo);
              props.manageAlert('Login Successful', 'success');
              setIsLoading(false);
              props.setLogInTrigger();
              navigate('/');
            }
            else {
                props.manageAlert('Invalid Login', 'fail');
                setIsLoading(false);
            }
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
    };


    return (props.trigger) ? (
        <div id="login">
            <div className="login-container">
                <button className="close-btn" 
                    onClick={props.setLogInTrigger}>
                    <FontAwesomeIcon className="close-icon" icon={faXmark} />
                </button>
                <div className="login-header">
                    <img className="logo" src={require("../assets/images/logo.png")}></img>
                    <p>Login To Continue</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        onChange={handleChange}
                    />

                    <div className='button-container'>
                        <a className="forgot-password">Forgot Password?</a>
                        {isLoading ? 
                            <BeatLoader className="loading-icon" color="#7179e7" />
                        :
                            <button className="blue-btn" type="submit">SIGN IN</button>
                        }
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
                    <p className='user-text'> New User? <a className="underline-text" 
                        onClick={() => {props.setLogInTrigger();props.setSignUpTrigger();}}>SIGN UP</a></p>
                </div>
            </div>
        </div>
    ) : "";
}

export default Login;
