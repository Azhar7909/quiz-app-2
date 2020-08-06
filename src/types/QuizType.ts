import React from 'react'


export type QuestionType = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}
export type QuizType = {
    category:string
    question: string
    option: string[]
    answer: string
    correct_answer: string
}
export type questionPropsType = {
    category:string
    question: string
    options: string[]
    callback: (e:React.FormEvent<EventTarget>, ans:string) => void
    quiz: QuizType[]
    currentStep:number
}