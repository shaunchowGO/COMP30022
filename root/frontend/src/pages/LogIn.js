import React from 'react';
import '../css/popups/Login.css';
import { getTeacherProfile } from '../utils/api';
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

    const [teacherData1, setTeacherData] = React.useState(null);

    React.useEffect(() => {
        async function retrieveTeacherInfo(){
        const data = await getTeacherProfile();
        console.log('Retrieving Teacher Data...')
        setTeacherData(data);

    }
        retrieveTeacherInfo();
    }, []);
    console.log('Teacher data:' ,teacherData1)

    return (props.trigger) ? (
        <div id="login">
            <div className="dropdown">
                <Dropdown data={teacherData1 !== null ? teacherData1 : ""}/>
            </div>
            <div className="login-container">
                <button className="close-btn" 
                    onClick={props.SetLogInTrigger}>
                    <FontAwesomeIcon className="close-icon" icon={faXmark} />
                </button>
                <div className="login-header">
                    <img className="logo" src={require("../assets/images/logo.png")}></img>
                    <p>Login To Continue</p>
                </div>
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
                    <p className='user-text'> New User? <a className="underline-text" 
                        onClick={() => {props.SetLogInTrigger();props.SetSignUpTrigger();}}>SIGN UP</a></p>
                </div>
            </div>
        </div>
    ) : "";
}

export default Login;
