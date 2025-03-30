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
                <Route path="/admin" element={
                    login_title === 'admin' ? <Admin/> : <Navigate to="/" />
                } />
                <Route path="/employee" element={
                    login_title === 'employee' ? <Employee/> : <Navigate to="/" />
                } />
                {/* <Route path="/admin" element={<Admin/>} />
                <Route path="/employee" element={<Employee/>} /> */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;