import React, {useState} from 'react';
import './Login.scss'; 
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../services/apiService';
import {  toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import {ImSpinner10} from 'react-icons/im'; 
import Language from '../Header/Language';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
    const handleLogin = async() => {
        const isValidEmail = validateEmail(email);
      if(!isValidEmail){
        toast.error('Invalid email!');
        // toast.success('Right email!');
        // toast.info();
        return;
      }
      if(!password){
        toast.error('Invalid password!');
        return;
      }
      // RESET
      setIsLoading(true); 

        // alert('login'); 
        let data = await postLogin(email, password);
        if(data && data.EC === 0){
          dispatch(
              // {
              //   type: 'FETCH_USER_LOGIN_SUCCESS', 
              //   payload: data,
              // }
              doLogin((data)),
            )
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/'); 
          }
          if(data && data.EC !== 0){
            toast.error(data.EM);
            setIsLoading(false);
          }
    }

    const handleKeyDown = (event) => {
      if(event && event.key === 'Enter'){
        handleLogin();
      }
    }
    return (
        <div className='login-container'>
            {/* login component */}
            <div className='header'>
               <span>Don't have an account yet ?</span> 
               <button onClick={() => navigate('/register')} >Sign up</button>
               <Language/>
            </div>
            <div className='title col-4 mx-auto'>
                Ask IT &amp; Eric
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={"email"} className='form-control'
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    ></input>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type={"password"} className='form-control'
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event)}
                    ></input>
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <button className='btn-submit'
                onClick={()=> handleLogin()}
                disabled={isLoading}
                >
                  {isLoading===true && <ImSpinner10 className='loader-icon' />}
                  <span>Login to HoiDanIT</span> 
                  </button>
            </div>
            <div className='text-center'>
                <span className='back' onClick={()=> {navigate('/')}} >&#60; &#60;Go to Homepage</span>
            </div>
        </div>
    );
}

export default Login;