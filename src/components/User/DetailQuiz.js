
import React, {useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {getDataQuiz, postSubmitQuiz} from '../services/apiService';
import _ from 'lodash';

import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './RightContent/RightContent';

const DetailQuiz = () => {
    const params = useParams(); 
    // console.log('>>> params in DetailQUiz: ', params); 
    const quizId = params.id;

    const location = useLocation(); //De biet user tu page nao di den

    // console.log('>>> location: ', location); 

    const [dataQuiz, setDataQuiz] = useState([]);

    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);

    const [dataModalResult, setDataModalResult] = useState({});
    useEffect(() => {
       fetchQuestions();
    }, [quizId]);


    const fetchQuestions = async() => {
        let res = await getDataQuiz(quizId);
        console.log('>>> res data in DetailQuiz; ', res); 
        if(res && res.EC === 0){
            let raw = res.DT;
            let data =  _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {  
            let answers = [];
            let questionDescription, image = null;
            value.forEach((item, index) => {
                if(index === 0){ //CHi can lay 1 lan vi data is same(description)
                    questionDescription = item.description; //RENAME
                    image = item.image; //RENAME
                }
                answers.push(item.answers);
                // console.log('item answer: ', item.answers );
                item.answers.isSelected = false;
            })
            // console.log('value: ', value, 'key: ', key );

                // return { questionId: key, data: value } //RENAME : questionId = key , data = value
                return { questionId: key, answers, questionDescription, image } //rename : questionId = key , answers = value
                }
                
            )
        .value(); 

            // console.log(data); 

            setDataQuiz(data);
        }
    }

    console.log('>>> DetailQuiz => dataQuiz: ', dataQuiz);
    const handlePrev = () =>{
        if(index - 1 < 0) return; 
        {
            setIndex(index - 1);
        }
    }
    const handleNext = () =>{
        if(dataQuiz && dataQuiz.length > index + 1){
            setIndex(index + 1);
        }
    }

    const handleCheckbox = (answerId, questionId) =>{
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find((item)=> +item.questionId === +questionId)
        if(question && question.answers){
            console.log('ques: ', question);
           let b = question.answers.map(item => {
            if(+item.id === +answerId){
                // item.isSelected = true;
                item.isSelected = !item.isSelected;
            }
            return item;
           })
           question.answers = b; //overrite for update dataQuizClone
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if(index > -1){
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone); 
        }
    }

    const handleFinishQuiz = async() => {
        console.log('>>>before finish Quiz: ', dataQuiz);
        let payload = {
            quizId: +quizId, //convert string to number
            answers: [],
        };
        let answers = [];
        if(dataQuiz && dataQuiz.length > 0){
           dataQuiz.forEach(question => {
                
                let questionId = question.questionId;
                let userAnswerId = [];

                //todo: userAnswerId
                question.answers.forEach(a => {
                    if(a.isSelected === true){
                        userAnswerId.push(a.id);
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                })
           })

           payload.answers = answers;
           console.log('>>> payload: ', payload);
           let res = await postSubmitQuiz(payload);
           console.log('>>> check res: ', res);

           if(res && res.EC === 0){
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                })
                setIsShowModalResult(true);
           }else{
            alert('something wrong...');
           }
        }

    }
    return (
        <div className='detail-quiz-container' >
           <div className='left-content' >
                <div className='title'>
                   Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr/>
                <div className='q-body'>
                    <img/>
                </div>
                <div className='q-content'>
                    <Question 
                    handleCheckbox={handleCheckbox}
                    index={index}
                    data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index]: []}
                    />
                </div>
                <div className='footer'>
                    <button className='btn btn-primary'
                    onClick={() => handlePrev()}
                    >Prev</button>

                    <button className='btn btn-secondary'
                    onClick={() => handleNext()}
                    >Next</button>
                    <button className='btn btn-warning'
                    onClick={() => handleFinishQuiz()}
                    >Finish</button>
                </div>

           </div>

           <div className='right-content'>
                <RightContent
                dataQuiz = {dataQuiz}
                handleFinishQuiz = {handleFinishQuiz}
                />
           </div>
           <ModalResult
           show={isShowModalResult}
           setShow={setIsShowModalResult}
           dataModalResult={dataModalResult}
           />
        </div>
    );
}

export default DetailQuiz;
