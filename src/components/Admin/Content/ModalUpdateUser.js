import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
// backdrop: use for only click inside area of modal so modal can close
// Modal must add className because default display on website so modal will putted out of index root
import {FcPlus} from "react-icons/fc";

// import axios from 'axios';

import {  toast } from 'react-toastify';
import { putUpdateUser } from '../../services/apiService';

import _ from 'lodash';

const ModalUpdateUser = (props) => {

    // const [show, setShow] = useState(false);
    const {show, setShow, dataUpdate} = props;

    const handleClose = () => {
      setShow(false);
      setEmail("");
      setPassword("");
      setUsername("");
      setRole("USER");
      setImage("");
      setPreviewImage("");
      // ModalUpdateUser: Xu ly khi click vao mot item 2 lan(lan 1 thi data hien ra, lan 2 thi data lai ko hien ra)
      props.resetUpdateData();
    }
    // const handleShow = () => setShow(true);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole]  = useState("USER"); 
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState(""); 

    // effect here se chay lai moi lan data change
    useEffect(() => {
        // console.log('run useEffect: ', dataUpdate);
        if(!_.isEmpty(dataUpdate)){
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            setPreviewImage(`data:image/jpeg;base64, ${dataUpdate.image}`);
        }
    }, [props.dataUpdate]);

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
      // const data = new FormData();
      // data.append('email', email); 
      // data.append('password', password); 
      // data.append('username', username); 
      // data.append('role', role); 
      // data.append('userImage', image); 

      // let res = await axios.post('http://localhost:8081/api/v1/participant', data);
      let data = await putUpdateUser(dataUpdate.id, username, role, image); 

      // console.log('>>> check res: ', res.data); 
      // if(res.data && res.data.EC === 0){
      //   toast.success(res.data.EM);
      //   handleClose(); 
      // }
      // if(res.data && res.data.EC !== 0){
      //   toast.error(res.data.EM);
      // }
      // Sau khi co interceptor trong axiosCustomize.js roi thi ko can 'res' nua
    //   console.log('>>> check data: ', data); 
      if(data && data.EC === 0){
        toast.success(data.EM);
        handleClose(); 
        // prevent load use liftup-state
        // await props.fetchListUsers(); 
        // props.setCurrentPage(1);
        await props.fetchListUserWithPaginate(props.currentPage);
      }
      if(data && data.EC !== 0){
        toast.error(data.EM);
      }
    }

    // console.log('check dataupdate: ', props.dataUpdate)
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
          <Modal.Header closeButton>
            <Modal.Title>Update a user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label" >Email</label>
                    <input type="email" className="form-control"
                    value={email}
                    disabled={true}
                    onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="col-md-6">
                    <label  className="form-label" >Password</label>
                    <input type="password" className="form-control" 
                    value={password}
                    disabled={true}
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
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      >
                      <option value="USER" >USER</option>
                      <option value="ADMIN">ADMIN</option>
                      {/* <option  >USER</option>
                      <option >ADMIN</option> */}
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

  export default ModalUpdateUser;