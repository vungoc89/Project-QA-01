import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { FETCH_USER_LOGIN_SUCCESS } from '../../../../redux/action/userAction';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../services/apiService';
import {toast} from 'react-toastify';
const AssignQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
      fetchQuiz(); 
      fetchUser();
     }, []);
  
     const fetchQuiz = async() => {
      let res = await getAllQuizForAdmin();
      // console.log('>>> res Quiz table: ', res);
      if(res && res.EC === 0){
          let newQuiz = res.DT.map(item => {
              return {
                  value:item.id,
                  label:`${item.id} - ${item.name}`,
              }
          })
          setListQuiz(newQuiz);;
      }
  }
     const fetchUser= async() => {
      let res = await getAllUsers();
      // console.log('>>> res Quiz table: ', res);
      if(res && res.EC === 0){
          let users = res.DT.map(item => {
              return {
                  value:item.id,
                  label:`${item.id} - ${item.username} - ${item.email}`,
              }
          })
          setListUser(users);;
      }
  }

  const handleAssign = async () => {
    let rs = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (rs && rs.EC === 0) {
        
        toast.success(rs.EM);
        // setSelectedQuiz({});
        // setSelectedUser({});
    } else {
        toast.error(rs.EM);
    }
  }
    return (
        <div className='asign-quiz-container row'>
            <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    className='form-control'
                    />
            </div>

            <div className='col-6 form-group'>
                    <label className='mb-2'>Select User: </label>
                    <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    className='form-control'
                    />
            </div>

            <div>
                <button 
                className='btn btn-warning mt-3'
                onClick={() => handleAssign()}
                >Assign</button>
            </div>
        </div>
    );
}

export default AssignQuiz;
