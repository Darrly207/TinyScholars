import React, { useEffect, useState } from "react";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Alert } from "../components/alert";
import { Medal, Trophy, Award } from "lucide-react";
import Confetti from "../components/Confetti";
import SadFace from "../components/SadFace";
import { useGameLogic } from "../hook/TextWord";
import imgBackground from "../assets/background1.png";
interface GameQuestion {
  image: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

interface GameLogicHook {
  gameStarted: boolean;
  currentQuestion: number;
  score: number;
  showSuccess: boolean;
  showError: boolean;
  showConfetti: boolean;
  gameFinished: boolean;
  handleStartGame: () => void;
  handleAnswer: (option: string) => void;
  getFinalScore: () => number;
  totalQuestions: number;
  gameData: GameQuestion[];
  showRetryMessage: boolean;
  attempts: number;
}

const TextWord: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameLogic = useGameLogic() as GameLogicHook;
  const {
    gameStarted,
    currentQuestion,
    score,
    showSuccess,
    showError,
    showConfetti,
    gameFinished,
    handleStartGame,
    handleAnswer,
    getFinalScore,
    totalQuestions,
    gameData,
    showRetryMessage,
    attempts,
  } = gameLogic;

  // Safe fullscreen handling
  useEffect(() => {
    const handleFullscreen = async () => {
      try {
        if (
          !document.fullscreenElement &&
          document.documentElement.requestFullscreen
        ) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (err) {
        console.log("Fullscreen request failed or was denied:", err);
        // Game continues to work without fullscreen
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Listen for fullscreen changes
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Try to enter fullscreen when game starts
    if (gameStarted) {
      handleFullscreen();
    }

    // Cleanup listener
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [gameStarted]);

  const containerClassName = `game-container ${
    isFullscreen ? "fullscreen" : ""
  }`;

  if (!gameStarted) {
    return (
      <div className={containerClassName}>
        <Card className="welcome-card">
          <div className="card-body text-center">
            <div className="mb-4">
              <h1 className="title">Word Game!</h1>
              <p className="lead">ARE YOU READY TO JOIN US?</p>
            </div>

            {score > 0 && (
              <div className="previous-score">
                <Trophy className="text-yellow-400" size={48} />
                <h3>Previous Score</h3>
                <div className="score-display">
                  <Medal className="text-blue-500" size={24} />
                  <p className="score-text">
                    {score}/{totalQuestions}
                  </p>
                </div>
              </div>
            )}

            <Button onClick={handleStartGame} className="start-button">
              {score > 0 ? "Play Again" : "Start Game"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className={containerClassName}>
        <Card className="result-card">
          <div className="card-body text-center">
            <Award className="text-yellow-400 mb-4" size={80} />
            <h2 className="text-blue-500 mb-3">Congratulations!</h2>
            <p className="score-text">
              Final Score: {score}/{totalQuestions}
            </p>
            <p className="accuracy-text">Accuracy: {getFinalScore()}%</p>
            <Button
              onClick={handleStartGame}
              className="restart-button"
              style={{ position: "fixed" }}
            >
              Play Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={containerClassName}
      style={{
        backgroundImage: imgBackground,
        backgroundPosition: "center",
        backgroundSize: "cover",
        justifyContent: "center",
        height: "100vh",
        display: "flex",
        width: "100vw",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div className="game-content">
        <div className="game-header">
          <h2>CHOOSE THE WORD ACCORDING TO THE PICTURE THAT APPEARS</h2>
        </div>

        <div
          className="game-main"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <div
            className="question-section"
            style={{
              flex: 1,
              width: "100%",
              marginLeft: "-20vw",
            }}
          >
            <div className="options-section">
              {gameData[currentQuestion].options.map(
                (option: string, index: number) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="option-button"
                  >
                    {option}
                  </Button>
                )
              )}
            </div>
            <img
              src={gameData[currentQuestion].image}
              alt="Question"
              className="question-image"
              style={{ flex: 1, marginLeft: "10vw" }}
            />
          </div>

          <div className="score-counter">
            {currentQuestion + 1} / {totalQuestions}
          </div>

          {showRetryMessage && (
            <div className="retry-message">
              Wrong answer! Please try again.
              {attempts > 0 && ` (Attempts: ${attempts})`}
            </div>
          )}
        </div>
      </div>

      {showSuccess && (
        <Alert className="success-alert">
          <div className="alert-content">Correct! 🎉</div>
        </Alert>
      )}

      {showError && (
        <Alert className="error-alert">
          <div className="alert-content">Try Again! 😅</div>
        </Alert>
      )}

      <Confetti isActive={showConfetti} />
      <SadFace show={showError} />

      <style>{`
        .game-fullscreen {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(to bottom, #87CEEB, #90EE90);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          padding: 1rem;
        }

        .game-content {
          width: 100%;
          max-width: 1200px;
          height: 90vh;
          background: transparent;
          position: relative;
        }

        .game-header {
          background: rgba(70, 90, 120, 0.9);
          padding: 1rem;
          border-radius: 50px;
      
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .game-header h2 {
          color: white;
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .game-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 1rem;
          position: relative;
        }

        .question-section {
          background: white;
          padding: 1rem;
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          aspect-ratio: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .question-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .options-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 400px;
        }

        .option-button {
       
          background: white;
          padding: 15px 20px;
          border-radius: 25px;
          border: 3px solid #333;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: move;
          transition: transform 0.2s;
          width: 30vw;
          justify-content: flex-start;
        }

        .option-button:hover {
          background: #f0f0f0;
          transform: scale(1.02);
        }

        .score-counter {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: #ff6b6b;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1.2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .retry-message {
          color: #ff4444;
          font-weight: bold;
          text-align: center;
          margin-top: 1rem;
        }

        .success-alert,
        .error-alert {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1.2rem;
          font-weight: bold;
          z-index: 1000;
        }

        .success-alert {
          background: #4CAF50;
          color: white;
        }

        .error-alert {
          background: #ff4444;
          color: white;
        }

        .welcome-card,
        .result-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 1rem;
        }

        .previous-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .score-display {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .score-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .accuracy-text {
          color: #666;
          font-size: 1.1rem;
        }

        .start-button,
        .restart-button {
          background: linear-gradient(45deg, #4CAF50, #45a049);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .start-button:hover,
        .restart-button:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default TextWord;
