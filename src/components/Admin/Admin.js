import React, {useState} from 'react';
import SideBar from './SideBar';
import './Admin.scss'; 
import { FaBars } from "react-icons/fa";

import {Outlet} from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from '../Header/Language';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
                    <span onClick={() => setCollapse(!collapsed)} >
                        <FaBars className='leftside'/>
                    </span>

                    <div className='rightside'>
                        <Language/>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            {/* <NavDropdown.Item>Log in</NavDropdown.Item> */}
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item
                            >Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                
                </div>

                <div className='admin-main'>
                    <PerfectScrollbar>
                        <Outlet/>
                    </PerfectScrollbar>
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
