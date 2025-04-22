import { useState } from 'react';

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const TriviaSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  const questions: TriviaQuestion[] = [
    {
      id: 1,
      question: 'What is the top speed a buffalo can run?',
      options: ['15 mph', '25 mph', '35 mph', '45 mph'],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: 'What do buffalo primarily eat?',
      options: ['Meat', 'Grass', 'Fish', 'Berries'],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: 'How much can an adult male buffalo (bull) weigh?',
      options: ['500 pounds', '1,000 pounds', '1,500 pounds', '2,000 pounds'],
      correctAnswer: 3,
    },
    {
      id: 4,
      question: 'How long can buffalo live in the wild?',
      options: ['5 years', '10 years', '15 years', '20 years'],
      correctAnswer: 3,
    },
    {
      id: 5,
      question: 'Which of these is NOT true about buffalo?',
      options: [
        'They can swim across rivers',
        'They have excellent eyesight',
        'They can jump high',
        'They form protective circles when threatened',
      ],
      correctAnswer: 1,
    },
  ];

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return; // Prevent selection when showing result

    setSelectedOption(optionIndex);
    setShowResult(true);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetTrivia = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setGameComplete(false);
  };

  const getOptionClass = (optionIndex: number) => {
    if (!showResult) return '';

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      return 'correct';
    }

    if (
      optionIndex === selectedOption &&
      selectedOption !== questions[currentQuestion].correctAnswer
    ) {
      return 'incorrect';
    }

    return '';
  };

  return (
    <div className="trivia-section">
      <h2 className="trivia-header">Buffalo Trivia Quiz 🎮</h2>

      {!gameComplete ? (
        <div className="trivia-container">
          <div className="question-counter">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <div className="question">
            <h3>{questions[currentQuestion].question}</h3>

            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option ${selectedOption === index ? 'selected' : ''} ${getOptionClass(index)}`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="feedback">
                {selectedOption === questions[currentQuestion].correctAnswer ? (
                  <p className="correct-feedback">Correct! Well done! 🎉</p>
                ) : (
                  <p className="incorrect-feedback">
                    Oops! The correct answer is:{' '}
                    {
                      questions[currentQuestion].options[
                        questions[currentQuestion].correctAnswer
                      ]
                    }{' '}
                    🙁
                  </p>
                )}
              </div>
            )}

            {showResult && (
              <button className="next-button" onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1
                  ? 'Next Question'
                  : 'See Results'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="results">
          <h3>Quiz Complete!</h3>
          <div className="score-display">
            <p>
              Your Score: {score} out of {questions.length}
            </p>
            <p className="score-message">
              {score === questions.length
                ? "Perfect score! You're a buffalo expert! 🏆"
                : score >= questions.length / 2
                  ? 'Good job! You know your buffalo facts! 🌟'
                  : 'Keep learning about buffalos! 📚'}
            </p>
          </div>
          <button className="reset-button" onClick={resetTrivia}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaSection;
