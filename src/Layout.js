import React from 'react';
import { Route, Routes } from "react-router-dom";
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login.js';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register'; 
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import {Suspense} from 'react';

const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger' >
            404.Not found data with your current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <Suspense fallback = {<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>
                
                <Route path="/quiz/:id" element={<DetailQuiz />} />

                    <Route path="/admins" element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }>
                        <Route index element={<DashBoard />} />
                        <Route path='manage-users' element={<ManageUser/>}></Route>
                        <Route path='manage-quizzes' element={<ManageQuiz/>}></Route>
                        <Route path='manage-questions' element={<Questions/>}></Route>
                    </Route>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="*" element={<NotFound/>} />
            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        </Suspense>
    );
}

export default Layout;