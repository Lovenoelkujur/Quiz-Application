import React, { useState, useEffect } from 'react';

// Example questions
const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Mark Twain", "Jane Austen", "Charles Dickens"],
      answer: "William Shakespeare"
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "NaCl"],
      answer: "H2O"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
      answer: "Leonardo da Vinci"
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      answer: "2"
    },
    {
      question: "In which year did the Titanic sink?",
      options: ["1910", "1912", "1915", "1920"],
      answer: "1912"
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
      answer: "Hydrogen"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
        answer: "Tokyo"
      },
      {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Marie Curie", "Albert Einstein", "Isaac Newton"],
        answer: "Alexander Fleming"
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
      },
      {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "South Korea", "Japan", "Thailand"],
        answer: "Japan"
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        answer: "Diamond"
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "F. Scott Fitzgerald", "Ernest Hemingway", "J.D. Salinger"],
        answer: "Harper Lee"
      },
      {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        answer: "300,000 km/s"
      },
      {
        question: "Which is the smallest continent by land area?",
        options: ["Europe", "Antarctica", "Australia", "South America"],
        answer: "Australia"
      },
      {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
        answer: "Albert Einstein"
      },
      {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Onion", "Avocado", "Lemon"],
        answer: "Avocado"
      }
  ];
  

// Shuffle function
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    // Scramble questions on component mount
    setQuizQuestions(shuffleArray([...questions]).slice(0, 5));
  }, []);

  const handleOptionClick = (selectedOption) => {
    if (showAnswer) return;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }

    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsQuizFinished(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setQuizQuestions(shuffleArray([...questions]).slice(0, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);
    setWrongAnswers([]);
    setIsQuizFinished(false);
  };

  if (isQuizFinished) {
    return (
        <div className='result-container'>
            <div className='result-main'>
                <h1>Quiz Finished!</h1>
                <p>Your Score: {score}</p>
                {wrongAnswers.length > 0 && (
                    <>
                        <h2>Incorrect Answers</h2>
                        <ul>
                        {wrongAnswers.map((question, index) => (
                            <li key={index}>
                            {question.question} - Correct Answer: {question.answer}
                            </li>
                        ))}
                        </ul>
                    </>
                )}
                <button onClick={resetQuiz}>Restart Quiz</button>
            </div>

        </div>
    );
  }

  // Check if there are no questions loaded yet
  if (quizQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className='container'>
        <div className='main'>
        <h1>Quiz</h1>
        <p className='score'>Score: {score}</p>
        <div className='q-card'>
            <p className='q'>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </p>
            <p>{currentQuestion.question}</p>
            <div className='grid-container'>
                {currentQuestion.options.map((option, index) => (
                        <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        disabled={showAnswer}
                        className='grid-item'
                        >
                        {option}
                        </button>

                ))}
            </div>
        </div>
        <div className='ans'>
            {showAnswer && <p>Correct Answer: {currentQuestion.answer}</p>}
        </div>
        </div>

    </div>
  );
};

export default Quiz;
