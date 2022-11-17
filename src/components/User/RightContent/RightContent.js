import React, {useRef} from 'react';
import CountDown from './CountDown';

const RightContent = (props) => {
    const {dataQuiz} = props;

    const onTimeUp = () => {
        props.handleFinishQuiz();
    }

    const refDiv = useRef([]);

    const getClassQuestion = (index, question) => {

        //check answered
        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if(isAnswered){
                return 'question selected';
            }
        }
        return 'question';
    }

    const handleClickQuestion = (question, index) => {
        props.setIndex(index);
        // console.log(refDiv.current);
        if(refDiv.current){
            refDiv.current.forEach(item => {
                if(item && item.className === 'question clicked'){
                    item.className = 'question';
                }
            })
        }
        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if(isAnswered){
                return;
            }
        }
        refDiv.current[index].className = 'question clicked';
    }
    return (
        <>
        <div className='main-timer'>
            <CountDown
            onTimeUp={onTimeUp}
            />
        </div>
        <div className='main-question'>
            {dataQuiz && dataQuiz.length > 0 &&
                dataQuiz.map((item, index) => {

                    return <div key={`question-abc-${index}`} 
                    className={getClassQuestion(index, item)}
                    onClick={()=>handleClickQuestion(item, index)}
                    ref={ele => refDiv.current[index] = ele}
                    >{index + 1} </div>
                })
            }
  
        </div>
        </>
    );
}

export default RightContent;
