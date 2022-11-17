import React from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const PrivateRoute = (props) => {
    console.log('>>> check props: ', props);
        
    const isAuthenticated = useSelector(state => state.user.isAuthenticated); 
    // const navigate = useNavigate();

if(!isAuthenticated){
    // navigate('/login');
    return <Navigate to='/login'></Navigate>;
}
    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoute;
