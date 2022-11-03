import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
// backdrop: use for only click inside area of modal so modal can close
// Modal must add className because default display on website so modal will putted out of index root
import {FcPlus} from "react-icons/fc";

// import axios from 'axios';

import {  toast } from 'react-toastify';
import { postCreateNewUser } from '../../services/apiService';


const ModalCreateUser = (props) => {

    // const [show, setShow] = useState(false);
    const {show, setShow} = props;

    const handleClose = () => {
      setShow(false);
      setEmail("");
      setPassword("");
      setUsername("");
      setRole("USER");
      setImage("");
      setPreviewImage("");
    }
    // const handleShow = () => setShow(true);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole]  = useState("USER"); 
    const [image, setImage] = useState("");

    const [previewImage, setPreviewImage] = useState(""); 
    const handleUploadImage = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0])); 
            // console.log('upload file: ', event.target.files[0]); 
            setImage(event.target.files[0]);

        }else{
            setPreviewImage("");
        }
    }

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    const handleSubmitCreateUser = async () => {
      // alert('saved'); 
      // let data = {
      //   email:  email,
      //   password: password,
      //   username: username,
      //   role: role,
      //   userImage: image, 
      // }
      // console.log(data); 
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
      // const data = new FormData();
      // data.append('email', email); 
      // data.append('password', password); 
      // data.append('username', username); 
      // data.append('role', role); 
      // data.append('userImage', image); 

      // let res = await axios.post('http://localhost:8081/api/v1/participant', data);
      let data = await postCreateNewUser(email, password, username, role, image); 

      // console.log('>>> check res: ', res.data); 
      // if(res.data && res.data.EC === 0){
      //   toast.success(res.data.EM);
      //   handleClose(); 
      // }
      // if(res.data && res.data.EC !== 0){
      //   toast.error(res.data.EM);
      // }
      // Sau khi co interceptor trong axiosCustomize.js roi thi ko can 'res' nua
      console.log('>>> check data: ', data); 
      if(data && data.EC === 0){
        toast.success(data.EM);
        handleClose(); 
        // prevent load use liftup-state
        // await props.fetchListUsers(); 
        props.setCurrentPage(1);
        await props.fetchListUserWithPaginate(1);
      }
      if(data && data.EC !== 0){
        toast.error(data.EM);
      }
    }
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
          <Modal.Header closeButton>
            <Modal.Title>Add new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label" >Email</label>
                    <input type="email" className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="col-md-6">
                    <label  className="form-label" >Password</label>
                    <input type="password" className="form-control" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label  className="form-label" >Username</label>
                    <input type="text" className="form-control" 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select className="form-select" 
                      onChange={(event) => setRole(event.target.value)}
                      >
                      <option value="USER" >USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                </div>

                <div className='col-md-12' >
                    <label className='form-label label-upload' htmlFor='labelUpload'>
                        <FcPlus/> Upload file Image
                    </label>
                    <input type="file" id='labelUpload' hidden
                    onChange={(event) => handleUploadImage(event)}></input>
                </div>
               
               <div className='col-md-12 img-preview'>
                    {
                        previewImage ? <img src={previewImage}></img>
                        :
                       <span>Preview image</span> 

                    }
                    
               </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>handleSubmitCreateUser()}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ModalCreateUser;