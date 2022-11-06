import React, {useEffect, useState} from 'react';
import { getAllQuizForAdmin } from '../../../services/apiService';
const TableQuiz = (props) => {
   const [listQuiz, setListQuiz] = useState([]);

   useEffect(() => {
    fetchQuiz(); 
   }, []);

   const fetchQuiz = async() => {
    let res = await getAllQuizForAdmin();
    console.log('>>> res Quiz table: ', res);
    if(res && res.EC === 0){
        setListQuiz(res.DT);;
    }

   }
    return (
        <>
        <div>List Quizzes: </div>
            <table className="table table-hover table-bordered mt-2">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Desc</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return(
                            <tr key={`table-quiz-${index}`}>
                        
                            <td>{item.id} </td>
                            <td>{item.name} </td>
                            <td>{item.description} </td>
                            <td>{item.difficulty} </td>
                            <td>
                                <button className='btn btn-warning'>Edit</button>
                                <button className='btn btn-danger'>Delete</button>
                            </td>
                            </tr>
                        )
                    })}
                   
                
                </tbody>
            </table>
        </>
    );
}

export default TableQuiz;
