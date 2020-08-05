import React, { useEffect, useState } from 'react'
import QuizCard from '../components/QuizCard'
import { grtQuizDetail } from '../services/QuizService';
import { QuizType } from '../types/QuizType';

export default function HomeScreen() {
    let [quiz, setQuiz] = useState<QuizType[]>([]);
    let [currentStep, setCurrentStep] = useState(0)
    let [score, setScore] = useState(0)
    let [showResult, setShowResult] = useState(false)
    // console.log("questions=>>", quiz);
 

    useEffect(() => {
        async function fetchData() {
            const questions: QuizType[] = await grtQuizDetail(5, "easy");
            setQuiz(questions); 
            console.log("questions",questions);           
        }
        fetchData();
    }, [])

    const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
        e.preventDefault();

        const currentQuestion: QuizType = quiz[currentStep];

        console.log("correct And: " + currentQuestion.correct_answer + "--user Selection:" + userAns)
        
        if (userAns === currentQuestion.correct_answer) {
            setScore(++score);
        }

        if (currentStep !== quiz.length - 1)
            setCurrentStep(++currentStep);
        else {
            setShowResult(true);
        }
    }

    if (!quiz.length)
        return <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading.. </h3>

    if (showResult) {
        return (<div className="question-container result-container">
            <h2 className="result-text">Result</h2>
            <p className="result-text">
                Your final score is
              <b> {score}</b> out of <b>{quiz.length}</b>
            </p>
            <div style={{padding: '20px',width:'500px',margin:'0 auto'}}>
                {quiz.map((val, ind)=>(
                    <div key={ind}>{ind+1}) 
                        <div>category: {val.category}</div>
                        <div>Question: {val.question}</div>
                        <ul>
                            {val.option.map((v, i)=>(
                                <li key={i}>{v}</li>
                            ))}
                        </ul>
                        <div>Correct Answer:{' '} {val.answer}</div><br/>
                    </div>
                ))}
            </div>
        </div>)
    }

    return (
        <div>
            <QuizCard
                options={quiz[currentStep].option}
                category={quiz[currentStep].category}
                question={quiz[currentStep].question}
                callback={handleSubmit}
            />
        </div>
    )
}
