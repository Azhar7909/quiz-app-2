import React, { useEffect, useState } from 'react'
import QuizCard from '../components/QuizCard'
import { grtQuizDetail } from '../services/QuizService';
import { QuizType } from '../types/QuizType';

export default function HomeScreen() {
    let [quiz, setQuiz] = useState<QuizType[]>([]);
    let [currentStep, setCurrentStep] = useState(0)
    let [score, setScore] = useState(0)
    let [showResult, setShowResult] = useState(false)
    let [youSelected, setYouSelected] = useState<string[]>([]);
    const [status, setStatus] = useState("");
    // console.log(quiz);
    

    useEffect(() => {
        async function fetchData() {
            const questions: QuizType[] = await grtQuizDetail(5, "easy");
            setQuiz(questions);          
        }
        fetchData();
    }, [])

    const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
        e.preventDefault();

        const currentQuestion: QuizType = quiz[currentStep];

        console.log("correct And: " + currentQuestion.correct_answer + "--user Selection:" + userAns)
        
        if (userAns === currentQuestion.correct_answer) {
            setScore(++score);
            setYouSelected([...youSelected, userAns + " "+" ✔"])
        }else{
            setYouSelected([...youSelected, userAns + " "+" ✖"])
        }

        if (currentStep !== quiz.length - 1)
            setCurrentStep(++currentStep);
        else {
            setShowResult(true);
            if (score === 3 || score === 4 || score === 5 ) {
                setStatus("PASS")
            }else{
                setStatus("FAIL")
            }
        }
    }

    if (!quiz.length)
        return <h1 className="loading">Loading ... </h1>

    if (showResult) {
        return (<div className="question-container result-container">
            <h1 className="result-text">Result ( {status} )</h1>
            <p className="result-text">
                Your final score is
              <b> {score}</b> out of <b>{quiz.length}</b>
            </p>
            <div style={{marginLeft: '28px', }}><h2 style={{textShadow:'4px 2px 5px #917373'}}>Your given Answers:</h2>
                {youSelected.map((v, i)=>(
                    <li key={i} style={{marginLeft:'25px'}}>{v}</li>
                ))}
            </div><br/>
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
            <div className="footer">END</div>
        </div>)
    }

    return (
        <div>
            <QuizCard
                options={quiz[currentStep].option}
                category={quiz[currentStep].category}
                question={quiz[currentStep].question}
                callback={handleSubmit}
                quiz={quiz}
                currentStep={currentStep}
            />
        </div>
    )
}
