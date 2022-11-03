
import React, {useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {getDataQuiz} from '../services/apiService';
import _ from 'lodash';

import './DetailQuiz.scss';

const DetailQuiz = () => {
    const params = useParams(); 
    console.log('>>> params in DetailQUiz: ', params); 
    const quizId = params.id;

    const location = useLocation(); //De biet user tu page nao di den

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
                if(index === 0){
                    questionDescription = item.description;
                    image = item.image;
                }
                answers.push(item.answers);
                console.log('item answer: ', item.answers );
            })
            console.log('value: ', value, 'key: ', key );

                return { questionId: key, data: value }
                }
                
            )
        .value(); 

        console.log(data); 

        }
    }
    return (
        <div className='detail-quiz-container' >
           <div className='left-content' >
                <div className='title'>
                   Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <div className='q-body'>

                </div>
                <div className='q-content'>
                    <div className='question'>Question 1: How are you doing?</div>
                    <div className='answer'>
                        <div className='a-child'>A. abc</div>
                        <div className='a-child'>A. abc</div>
                        <div className='a-child'>A. abc</div>

                    </div>
                </div>
                <div className='footer'>
                    <button className='btn btn-primary'>Prev</button>
                    <button className='btn btn-secondary'>Next</button>
                </div>

           </div>

           <div className='right-content'>
                count down
           </div>
        </div>
    );
}

export default DetailQuiz;
