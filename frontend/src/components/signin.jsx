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
        axios.get('https://ccb-achievement.azurewebsites.net/checkcookie', {
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
        axios.post('https://ccb-achievement.azurewebsites.net/login', {
                username: loginUsername,
                password: loginPassword
            },
            {
                withCredentials: true
            }
        ).then((response) => {
            if (response.data.result === "OK") {
                alert('Login Successfully');
                console.log('Login Successfully');
                if (response.data.title === "admin") {
                    console.log('Manager Login');
                    document.cookie = "authtoken=" + response.data.data.authtoken + "; path=/; domain=localhost; SameSite=None; Secure";
                    navigate('/admin');
                } else {
                    console.log('Employee Login');
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
        axios.post('', {
            username: signupUsername,
            password: signupPassword,
            position: position,
            title: title
        }, {
            withCredentials: true
        }).then((response) => {
            if (response.data.result === "OK") {
                console.log('Login Successfully');
                if (response.data.title === "admin") {
                    console.log('Manager Login');
                    document.cookie = "authtoken=" + response.data.data.authtoken + "; path=/; domain=localhost; SameSite=None; Secure";
                    navigate('/admin');
                } else {
                    console.log('Employee Login');
                    document.cookie = "authtoken=" + response.data.data.authtoken + "; path=/; domain=localhost; SameSite=None; Secure";
                    navigate('/admin');
                }
                alert('Sign up successfully, account has been login automatically.');
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
            <h1 className='title'>Bank Achievement System</h1>
            <MDBContainer className="p-3 mt-3 d-flex flex-column">

                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('login')} active={justifyActive === 'login'}>
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('signup')} active={justifyActive === 'signup'}>
                            Sign up
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
            </MDBContainer>
            <section style={
                {display: justifyActive === 'login' ? 'block' : 'none'}
            }>
                <MDBContainer className="p-3 d-flex flex-column">

                    <MDBInput wrapperClass='mb-4' label='username' id='login_username' type='email' value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='password' id='login_password' type='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>

                    <MDBBtn className="mb-4" onClick={handleLogin}>Login</MDBBtn>

                </MDBContainer>
            </section>
            <section style={
                {display: justifyActive === 'signup' ? 'block' : 'none'}
            }>
                <MDBContainer className="p-3 d-flex flex-column">

                    <MDBInput wrapperClass='mb-4' label='username' id='signup_username' type='email' value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='password' id='signup_password' type='password' value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='confirm-password' id='signup_confirm_password' type='password' value={signupPasswordConfirm} onChange={(e) => setSignupPasswordConfirm(e.target.value)}/>
                    <div className='alert_popup' style={
                        {display: signupPassword !== signupPasswordConfirm &&  signupPasswordConfirm !== '' ? 'block' : 'none'}
                    }>
                        <div className='alert alert-danger' role='alert' style={
                            {color: 'red', fontSize: 'small', padding: '0.5rem', margin: '0', textAlign: 'center', width: '100%', height: '100%', borderRadius: '0.25rem', border: '1px solid transparent', backgroundColor: 'rgba(255, 0, 0, 0.1)'}
                        }>
                            Passwords is inconsistent
                        </div>
                    </div>
                    <GeneralQuestionFrame question='Branch：' input={<Position position={position} onPositionChange={setPosition} minwidth={minwidth}/>}/>
                    <GeneralQuestionFrame question='Position：' input={<Title title={title} onTitleChange={setTitle} minwidth={minwidth}/>}/>
                    <br></br>
                    <MDBBtn className="mb-4" onClick={handleRegister}>Register</MDBBtn>
                </MDBContainer>
            </section>
        </>
    );
}

export default SignIn;