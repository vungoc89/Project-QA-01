import React, {useState} from 'react';
import SideBar from './SideBar';
import './Admin.scss'; 
import { FaBars } from "react-icons/fa";

import {Outlet} from "react-router-dom";

// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const Admin = (props) => {
    const[collapsed, setCollapse] = useState(false);
    return (
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SideBar collapsed={collapsed} ></SideBar>
            </div>
            <div className='admin-content'>
                <div className='admin-header'>
                    <FaBars onClick={() => setCollapse(!collapsed)} />
                </div>

                <div className='admin-main'>
                    <Outlet/>

                </div>
                
            </div>
            {/* <ToastContainer
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
                /> */}
        </div>
    );
}

export default Admin;
