import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const BuffaloQuiz = () => {
  const questions: Question[] = [
    {
      question: 'What is the scientific name for the American Bison?',
      options: [
        'Bison bison',
        'Bison americanus',
        'Bubalus bubalis',
        'Bos taurus',
      ],
      correctAnswer: 0,
    },
    {
      question: 'How fast can buffalo (American Bison) run?',
      options: ['15 mph', '25 mph', '35 mph', '45 mph'],
      correctAnswer: 2,
    },
    {
      question: 'What is a baby buffalo called?',
      options: ['Pup', 'Calf', 'Kid', 'Fawn'],
      correctAnswer: 1,
    },
    {
      question: 'How much can an adult male bison weigh?',
      options: [
        'Up to 500 pounds',
        'Up to 1,000 pounds',
        'Up to 1,500 pounds',
        'Up to 2,000 pounds',
      ],
      correctAnswer: 3,
    },
    {
      question: 'What is a group of buffalo called?',
      options: ['Herd', 'Gang', 'Flock', 'Pack'],
      correctAnswer: 0,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return; // Prevent selecting after answer is shown
    setSelectedOption(optionIndex);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    setShowAnswer(true);
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizComplete(false);
    setShowAnswer(false);
  };

  return (
    <div className="quiz-container">
      <h2>Buffalo Quiz</h2>

      {!quizComplete ? (
        <div className="quiz-content">
          <div className="question-number">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <h3 className="question-text">
            {questions[currentQuestion].question}
          </h3>

          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option ${selectedOption === index ? 'selected' : ''} 
                  ${
                    showAnswer
                      ? index === questions[currentQuestion].correctAnswer
                        ? 'correct'
                        : selectedOption === index
                          ? 'incorrect'
                          : ''
                      : ''
                  }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>

          <div className="quiz-controls">
            {!showAnswer ? (
              <button
                className="quiz-btn check-btn"
                onClick={checkAnswer}
                disabled={selectedOption === null}
              >
                Check Answer
              </button>
            ) : (
              <button className="quiz-btn next-btn" onClick={nextQuestion}>
                {currentQuestion < questions.length - 1
                  ? 'Next Question'
                  : 'See Results'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-results">
          <h3>Quiz Complete!</h3>
          <p className="score">
            You scored {score} out of {questions.length}!
          </p>
          {score === questions.length ? (
            <p className="perfect-score">
              Perfect score! You're a buffalo expert! 🏆
            </p>
          ) : score >= questions.length / 2 ? (
            <p className="good-score">
              Great job! You know your buffalo facts!
            </p>
          ) : (
            <p className="try-again">
              Keep learning about these amazing animals!
            </p>
          )}
          <button className="quiz-btn reset-btn" onClick={resetQuiz}>
            Take Quiz Again
          </button>
        </div>
      )}
    </div>
  );
};

export default BuffaloQuiz;
