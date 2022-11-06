import React, {useState} from 'react';
import Select from 'react-select';
import './Questions.scss';
import {BsFillPatchPlusFill, BsPatchMinusFill} from 'react-icons/bs';
import {RiImageAddFill} from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
      ];

      const [selectedQuiz, setSelectedQuiz] = useState({});

      const [questions, setQuestions] = useState([
        {
            id:uuidv4(),
            description: 'ques1',
            imageFile:'',
            imageName: '',
            answers:[
                {
                    id: uuidv4(),
                    description:'ans11',
                    isCorrect: false,
                },
            ]
        },
      ]);

    const  handleAddRemoveQuestion = (type, id) => {
        if(type === 'ADD'){
            const newQuestion = {
                id:uuidv4(),
                description: '',
                imageFile:'',
                imageName: '',
                answers:[
                    {
                        id: uuidv4(),
                        description:'',
                        isCorrect: false,
                    },
                ]
            };

            setQuestions([...questions, newQuestion]);
        }
        if(type === 'REMOVE'){
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);

            setQuestions(questionsClone);
        }
    }

    const  handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);

        if(type === 'ADD'){
            const newAnswer = {
                id: uuidv4(),
                description:'',
                isCorrect: false,
            };

            let index = questionsClone.findIndex((item ) => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if(type === 'REMOVE'){
            let index = questionsClone.findIndex((item ) => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
    }
    return (
        <div className='questions-container'>
            <div className='title'>
                Manage Questions
            </div>

            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label>Select Quiz: </label>
                    <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={options}
                    className='form-control'
                    />
                </div>

                     <div className='mt-3 mb-2'>
                        Add questions:
                    </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div className='q-main mb-5'>
               
                            <div key={question.id} className='questions-content'>
                                    <div className="form-floating description">
                                        <input 
                                        type="email" 
                                        class="form-control"  
                                        placeholder="name@example.com"
                                        value={question.description}
                                        />
                                        <label>Question {index + 1} 's Description</label>
                                    </div>
                                
        
                                    <div className='group-upload'>
                                        <label>
                                            <RiImageAddFill className='label-up'/>
                                        </label>
                                        <input type={'file'} hidden></input>
                                        <span>0 file is uploaded</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={()=> handleAddRemoveQuestion('ADD', '')} >
                                            <BsFillPatchPlusFill className='icon-add'/>
                                        </span>
                                    
                                        {questions.length > 1 && 
                                        <span onClick={()=> handleAddRemoveQuestion('REMOVE', question.id)} >
                                            <BsPatchMinusFill className='icon-remove'/>
                                        </span>
                                        }
                                    
                                    </div>
                            </div>
                            {
                                question.answers && question.answers.length > 0 
                                && question.answers.map((answer, index) => {
                                    return (
                                <div key={answer.id} className='answers-content'>
                                    <input className='form-check-input isCorrect' type='checkbox'/>
                                    <div className="form-floating description answer-name">
                                        <input 
                                        type="email" 
                                        class="form-control"  
                                        placeholder="name@example.com"
                                        value={answer.description}
                                        />
                                        <label>Answers {index + 1} </label>
                                    </div>
                                    <div className='btn-group'>
                                            <span onClick={()=> handleAddRemoveAnswer('ADD', question.id)}>
                                                <BsFillPatchPlusFill className='icon-add'/>
                                            </span>
                                        
                                            {question.answers.length > 1 && 
                                            <span onClick={()=> handleAddRemoveAnswer('REMOVE',question.id, answer.id)}>
                                                <BsPatchMinusFill className='icon-remove'/>
                                            </span>
                                            }
                                        
                                        </div>
                                </div>
                                    )
                                })
                            }
                            
                        </div>
                        )
                    })
                }
              
            </div>
        </div>
    );
}

export default Questions;
