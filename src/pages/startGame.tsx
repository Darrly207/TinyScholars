import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MultipleChoice from "../components/multipleChoice";
import TrueFalseQuest from "../components/trueFalseQuest";
import MemoryCardGame from "../components/memoryCard";
import FillInBlankQuest from "../components/fillInBlank";
import {
  Question,
  MultipleChoiceGame,
  TrueFalse,
  MemoryCard,
  FillInBlankGame,
} from "../types/game";

interface GamePlayProps {
  questions: Question[];
  settings: any;
}

const GamePlayPage: React.FC<GamePlayProps> = ({ questions, settings }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<number | string>>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: number | string) => {
    const isCorrect = checkAnswer(answer);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Save user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);

    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1000);
    } else {
      setShowResult(true);
    }
  };

  const checkAnswer = (answer: number | string): boolean => {
    switch (currentQuestion.type) {
      case "multipleChoice":
      case "trueFalse":
        return (
          (currentQuestion as MultipleChoiceGame | TrueFalse).correctAnswer ===
          answer
        );
      case "fillInBlank":
        return (currentQuestion as FillInBlankGame).correctAnswer === answer;
      case "memoryCard":
        // For memory card, we might need different logic
        return true;
      default:
        return false;
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "multipleChoice":
        return (
          <MultipleChoice
            question={currentQuestion as MultipleChoiceGame}
            onQuestionUpdate={() => {}}
            standalone={true}
            onAnswerSelected={handleAnswer}
          />
        );
      case "trueFalse":
        return (
          <TrueFalseQuest
            question={currentQuestion as TrueFalse}
            onQuestionUpdate={() => {}}
            // onAnswerSelected={handleAnswer}
          />
        );
      case "memoryCard":
        return (
          <MemoryCardGame
            question={currentQuestion as MemoryCard}
            onQuestionUpdate={() => {}}
            // onGameComplete={(completed) => {
            //   if (completed) handleAnswer(1);
            // }}
          />
        );
      case "fillInBlank":
        return (
          <FillInBlankQuest
            question={currentQuestion as FillInBlankGame}
            onQuestionUpdate={() => {}}
            // onAnswerSubmitted={handleAnswer}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  const renderResults = () => (
    <div className="results-container">
      <h2>Game Complete!</h2>
      <p>
        Your Score: {score} / {questions.length}
      </p>
      <div className="answer-review">
        {questions.map((question, index) => (
          <div key={index} className="question-result">
            <p>
              Question {index + 1}:{" "}
              {/* {userAnswers[index] === question.correctAnswer ? "✅" : "❌"} */}
            </p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/start")}>Play Again</button>
    </div>
  );

  return (
    <div className="game-play-container">
      {!showResult ? (
        <>
          <div className="game-header">
            <div className="score">Score: {score}</div>
            <div className="progress">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          <div className="question-container">{renderQuestion()}</div>
        </>
      ) : (
        renderResults()
      )}

      <style>{`
        .game-play-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .score {
          font-size: 24px;
          font-weight: bold;
          color: #4a90e2;
        }

        .progress {
          font-size: 18px;
          color: #666;
        }

        .question-container {
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .results-container {
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .answer-review {
          margin: 20px 0;
          text-align: left;
        }

        .question-result {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }

        button {
          padding: 10px 20px;
          background: #4a90e2;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }

        button:hover {
          background: #357abd;
        }
      `}</style>
    </div>
  );
};

export default GamePlayPage;
