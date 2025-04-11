import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Router, Navigate, useNavigate} from 'react-router-dom';

import SignIn from './signin';
import Admin from './admin/admin';
import Employee from './employee/employee';


function AppRouter() {
    const [login_title, setLoginTitle] = useState('signin');
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn login_title={login_title} setLoginTitle={setLoginTitle}/>}/>

                {/*The following portion is for login/sign-up - comment out if you want to preview the employee or admin dashboard*/}
                <Route path="/admin" element={
                    login_title === 'admin' ? <Admin/> : <Navigate to="/" />
                } />
                <Route path="/employee" element={
                    login_title === 'employee' ? <Employee/> : <Navigate to="/" />
                } />


                {/* The following routes are for the admin pages after login - uncomment the following line and comment the login/sign-up portion to preview the admin dashboard*/}
                {/* <Route path="/admin" element={<Admin/>} />*/}

                {/* The following route is for the employee pages after login - uncomment the following line and comment the login/sign-up and admin portion to preview the employee dashboard*/}
                {/*<Route path="/employee" element={<Employee/>} /> */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;