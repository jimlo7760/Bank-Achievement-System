import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBBtn,
  MDBInput
}
from 'mdb-react-ui-kit';

import { createTheme } from '@mui/material';
import Position from './employee/position';
import Title from './employee/title';
import GeneralQuestionFrame from './employee/general_question_frame';
import '../App.css';

function SignIn(props) {

    const [justifyActive, setJustifyActive] = useState('login');;
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');
    const [position, setPosition] = useState('');
    const [title, setTitle] = useState('');
    const minwidth = 250;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://sdd-test-project-cma8b0b7ayc4duhx.canadacentral-01.azurewebsites.net//checkcookie', {
            withCredentials: true
        }).then((response) => {
            if (response.data.result === "OK") {
                if (response.data.data.title === "admin") {
                    props.setLoginTitle('admin');
                    navigate('/admin');
                } else {
                    props.setLoginTitle('employee');
                    navigate('/employee');
                }
            }
        });
    }, []);

    const handleLogin = () => {
        console.log('login');
        axios.post('https://sdd-test-project-cma8b0b7ayc4duhx.canadacentral-01.azurewebsites.net//login', {
            username: loginUsername,
            password: loginPassword
        }, 
        {
            withCredentials: true
        }
        ).then((response) => {
            if (response.data.result === "OK") {
                alert('Login success');
                console.log('Login success');
                if (response.data.title === "admin") {
                    console.log('Admin login');
                    document.cookie = "authtoken=" + response.data.data.authtoken + "; path=/; domain=localhost; SameSite=None; Secure";
                    navigate('/admin');
                } else {
                    console.log('Employee login');
                    document.cookie = "authtoken=" + response.data.data.authtoken + "; path=/; domain=localhost; SameSite=None; Secure";  
                    navigate('/employee');
                }
            } else {
                alert(response.data.message);
            }
        });
    };

    const [url, setUrl] = useState('/');

    const handleRegister = () => {
        console.log('register');
        axios.post('https://sdd-test-project-cma8b0b7ayc4duhx.canadacentral-01.azurewebsites.net//register', {
            username: signupUsername,
            password: signupPassword,
            position: position,
            title: title
        }, {
            withCredentials: true
        }).then((response) => {
            if (response.data.result === "OK") {
                console.log('Login success');
                if (response.data.title === "admin") {
                    console.log('Admin login');
                    document.cookie = "authtoken=" + response.data.data.authtoken + "; path=/; domain=localhost; SameSite=None; Secure";
                    navigate('/admin');
                } else {
                    console.log('Employee login');
                    document.cookie = "authtoken=" + response.data.data.authtoken + "; path=/; domain=localhost; SameSite=None; Secure";
                    navigate('/admin');
                }
                alert('Register success, system will redirect to the ' + response.data.title + ' page');
            } else {
                alert(response.data.message);
            }
        });
    };

    useEffect(() => {
        if (url !== '/') {
            navigate(url);
        }
    }, [url]);

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

    return (
        <>
            <h1 className='title'>Welcome to Metrics</h1>
            <MDBContainer className="p-3 mt-3 d-flex flex-column">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem className = 'switch-tab'>
                <MDBTabsLink onClick={() => handleJustifyClick('login')} active={justifyActive === 'login'}>
                    Log In
                </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem className = 'switch-tab'>
                    <MDBTabsLink onClick={() => handleJustifyClick('signup')} active={justifyActive === 'signup'}>
                        Sign Up
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs> 



            </MDBContainer>
            <section style={
                {display: justifyActive === 'login' ? 'block' : 'none'}
            }>
                <MDBContainer className="p-3 d-flex flex-column">

                    {/* <MDBInput wrapperClass='mb-4' label='User Name' id='login_username' type='email' value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='login_password' type='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/> */}

                <div className="styled_input_wrapper">
                    <label className="styled_label" htmlFor="login_username">User Name</label>
                    <input
                        id='login_username' 
                        type='email' 
                        value={loginUsername} 
                        onChange={(e) => setLoginUsername(e.target.value)}
                        className="styled_input"
                    />
                    {loginUsername && (
                        <span className="clear_btn" onClick={() => setLoginUsername('')}>
                          x
                        </span>
                    )}
                </div>

                <div className="styled_input_wrapper">
                    <label className="styled_label" htmlFor="login_password">Password</label>
                    <input
                        id='login_password' 
                        type='password' 
                        value={loginPassword} 
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="styled_input"
                    />
                    {loginPassword && (
                        <span className="clear_btn" onClick={() => setLoginPassword('')}>
                        x
                        </span>
                    )}
                </div>

                    <MDBBtn className="main_button" onClick={handleLogin}>Log In</MDBBtn>

                </MDBContainer>
            </section>

            
            <section style={
                {display: justifyActive === 'signup' ? 'block' : 'none'}
            }>
                <MDBContainer className="p-3 d-flex flex-column">

                    {/* <MDBInput wrapperClass='mb-4' label='User Name' id='signup_username' type='email' value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='signup_password' type='password' value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Confirm Password' id='signup_confirm_password' type='password' value={signupPasswordConfirm} onChange={(e) => setSignupPasswordConfirm(e.target.value)}/> */}
                <div className="signup_grid">
               
                <div className="signup_left">
                    <div className="styled_input_wrapper">
                    <label htmlFor="signup_username" className="styled_label">User Name</label>
                    <input
                        id="signup_username"
                        type="email"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                        className="styled_input"
                    />
                    {signupUsername && (
                        <span className="clear_btn" onClick={() => setSignupUsername('')}>
                        x
                        </span>
                    )}
                    </div>

                    <div className="styled_input_wrapper">
                    <label htmlFor="signup_password" className="styled_label">Password</label>
                    <input
                        id="signup_password"
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="styled_input"
                    />
                    {signupPassword && (
                        <span className="clear_btn" onClick={() => setSignupPassword('')}>
                        x
                        </span>
                    )}
                    </div>

                    <div className="styled_input_wrapper">
                    <label htmlFor="signup_confirm_password" className="styled_label">Confirm Password</label>
                    <input
                        id="signup_confirm_password"
                        type="password"
                        value={signupPasswordConfirm}
                        onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                        className="styled_input"
                    />
                    {signupPasswordConfirm && (
                        <span className="clear_btn" onClick={() => setSignupPasswordConfirm('')}>
                        x
                        </span>
                    )}
                    </div>
                </div>

            
                <div className="signup_right">
                <div className="styled_input_wrapper">
                    <label className="styled_label" htmlFor="position_select">Branch</label>
                    <select
                        id="position_select"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="styled_input"
                    >
                        <option value="">Select Branch</option>
                        <option value="Albany">Albany</option>
                        <option value="Troy">Troy</option>
                        <option value="NYC">NYC</option>
                    </select>
                    </div>

                    <div className="styled_input_wrapper">
                    <label className="styled_label" htmlFor="title_select">Title</label>
                    <select
                        id="title_select"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="styled_input"
                    >
                        <option value="">Select Title</option>
                        <option value="Manager">Manager</option>
                        <option value="Teller">Teller</option>
                        <option value="Clerk">Clerk</option>
                    </select>
                    </div>

                </div>
                </div>

                
                <div className='alert_popup' style={{ display: signupPassword !== signupPasswordConfirm && signupPasswordConfirm !== '' ? 'block' : 'none' }}>
                <div className='alert alert-danger' role='alert' style={{
                    color: 'red', fontSize: 'small', padding: '0.5rem', margin: '0', textAlign: 'center',
                    width: '100%', height: '100%', borderRadius: '0.25rem', border: '1px solid transparent',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)'
                }}>
                    Password and confirm password not Match!
                </div>
                </div>

                    
{/* 
                <div className="styled_input_wrapper">
                <label htmlFor="signup_username" className="styled_label">User Name</label>
                <input
                    id="signup_username"
                    type="email"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="styled_input"
                />
                {signupUsername && (
                    <span className="clear_btn" onClick={() => setSignupUsername('')}>
                    x
                    </span>
                )}
                </div>

                <div className="styled_input_wrapper">
                <label htmlFor="signup_password" className="styled_label">Password</label>
                <input
                    id="signup_password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="styled_input"
                />
                {signupPassword && (
                    <span className="clear_btn" onClick={() => setSignupPassword('')}>
                    x
                    </span>
                )}
                </div>

                <div className="styled_input_wrapper">
                <label htmlFor="signup_confirm_password" className="styled_label">Confirm Password</label>
                <input
                    id="signup_confirm_password"
                    type="password"
                    value={signupPasswordConfirm}
                    onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                    className="styled_input"
                />
                {signupPasswordConfirm && (
                    <span className="clear_btn" onClick={() => setSignupPasswordConfirm('')}>
                    x
                    </span>
                )}
                </div>


                    <div className='alert_popup' style={
                        {display: signupPassword !== signupPasswordConfirm &&  signupPasswordConfirm !== '' ? 'block' : 'none'}
                    }>
                        <div className='alert alert-danger' role='alert' style={
                            {color: 'red', fontSize: 'small', padding: '0.5rem', margin: '0', textAlign: 'center', width: '100%', height: '100%', borderRadius: '0.25rem', border: '1px solid transparent', backgroundColor: 'rgba(255, 0, 0, 0.1)'}
                        }>
                            Password and confirm password not Match!
                        </div>
                    </div>
                    <GeneralQuestionFrame question='Branch:' input={<Position position={position} onPositionChange={setPosition} minwidth={minwidth}/>}/>
                    <GeneralQuestionFrame question='Title' input={<Title title={title} onTitleChange={setTitle} minwidth={minwidth}/>}/>
                    <br></br> */}
                    {/* <MDBBtn className="main_button" onClick={handleRegister}>Sign Up</MDBBtn> */}
                    <div className="signup_btn_container">
                        <button className="main_button signup_btn" onClick={handleRegister}>Register</button>
                    </div>

                </MDBContainer>
            </section>
        </>
  );
}

export default SignIn;