import React, { useState, useEffect } from 'react';
import {Button, Paper} from '@mui/material';
import { styled } from '@mui/material/styles';
const QuizPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    margin: 15,
  }));
function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [countdown, setCountdown] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const countFetched = 10;
  const [totalQuestions, setTotalQuestions] = useState(10);

  useEffect(() => {
    // Hier die Funktion zum Laden der Fragen
    async function fetchQuestions() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        const slicedData = data.slice(0, countFetched); // Wähle die ersten 10 Fragen aus dem API-Daten
        const formattedQuestions = slicedData.map(question => ({
          title: question.body,
          options: [`A) ${question.body.split(" ")[0]}`, `B) ${question.body.split(" ")[1]}`, `C) ${question.body.split(" ")[2]}`, `D) ${question.body.split(" ")[3]}`], // Beispieloptionen
          correctAnswer: `C) ${question.body.split(" ")[2]}` // Beispiel korrekte Antwort
        }));
        setTotalQuestions(formattedQuestions.length);
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
            if((countdown - 1) <= 20){
                setEnabled(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    } else {
        setEnabled(false);
        handleNextQuestion();
    }
  }, [countdown]);

  const handleOptionClick = (selectedOption) => {
    //if (countdown <= 20) {
      const selectedAnswer = questions[currentQuestionIndex].options[selectedOption];
      setUserAnswers([...userAnswers, { question: questions[currentQuestionIndex].title, answer: selectedAnswer, correctAnswer: questions[currentQuestionIndex].correctAnswer}]);
      setEnabled(false);
      handleNextQuestion();
    //}
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setCountdown(30);
    if (currentQuestionIndex + 1 === questions.length) {
      setShowResult(true);
    }
  };

  const renderOptions = () => {
    if (currentQuestionIndex < questions.length) {
      return questions[currentQuestionIndex].options.map((option, index) => (
        <Button variant="outlined" key={index} onClick={() => handleOptionClick(index)} disabled={!isEnabled}>
          {option}
        </Button>
      ));
    }
  };

  const renderResult = () => {
    return (
      <div>
        <h2>Result</h2>
        <table>
          <thead>
            <tr>
              <th>Questions</th>
              <th>Your Answers</th>
              <th>Correct Answers</th>
            </tr>
          </thead>
          <tbody>
            {userAnswers.map((answer, index) => (
              <tr key={index}>
                <td>{answer.question}</td>
                <td>{answer.answer}</td>
                <td>{answer.correctAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {showResult ? (
        renderResult()
      ) : (
        <QuizPaper  elevation={3}>
          <a>{questions[currentQuestionIndex]?.title}?</a>
          <div>Countdown: {countdown}</div>
          <div>Question: {currentQuestionIndex+1}/{totalQuestions}</div>
          <div>{renderOptions()}</div>
        </QuizPaper>
      )}
    </div>
  );
}

export default Quiz;
