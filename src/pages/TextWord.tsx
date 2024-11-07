import React from 'react';
import { Card } from '../components/card';
import { Button } from '../components/button';
import { Alert } from '../components/alert';
import { Medal, Trophy, Award } from 'lucide-react';
import Confetti from '../components/Confetti';
import SadFace from '../components/SadFace';
import { useGameLogic } from '../hook/TextWord';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define interfaces for the game data structure
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
        attempts
    } = useGameLogic() as GameLogicHook;

    if (!gameStarted) {
        return (
            <div className="quiz-container">
                <Card className="welcome-card">
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <h1 className="title gradient-text">Game!! </h1>
                            <p className="lead text-muted">
                                ARE YOU READY TO JOIN US?
                            </p>
                        </div>

                        {score > 0 && (
                            <div className="previous-score">
                                <div className="trophy-icon">
                                    <Trophy className="text-warning" size={48} />
                                </div>
                                <div className="score-content">
                                    <h3 className="text-primary mb-3">Previous Score</h3>
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <Medal className="text-primary" size={24} />
                                        <p className="h4 text-primary mb-0">
                                            {score}/{totalQuestions}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={handleStartGame}
                            className="start-button btn-gradient w-100"
                        >
                            {score > 0 ? 'Play Again' : 'Start Game'}
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    if (gameFinished) {
        return (
            <div className="quiz-container">
                <Card className="result-card">
                    <div className="card-body text-center">
                        <Award className="text-warning mb-4" size={80} />
                        <div>
                            <h2 className="text-primary mb-3">Congratulations</h2>
                            <p className="h3 text-primary">
                                Final Score : {score}/{totalQuestions}
                            </p>
                            <p className="text-muted mt-2">
                                Accuracy: {getFinalScore()}%
                            </p>
                        </div>
                        <Button
                            onClick={handleStartGame}
                            className="restart-button btn-gradient w-100"
                        >
                            Play Again
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <Card className="question-card">
                <div className="card-header gradient-header">
                    <h2 className="text-white text-center mb-0">
                        {gameData[currentQuestion].category}
                    </h2>
                </div>

                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className="badge bg-primary">
                            Question {currentQuestion + 1}/{totalQuestions}
                        </span>
                        <span className="badge bg-success">
                            Score: {score}/{totalQuestions}
                        </span>
                    </div>

                    <div className="text-center mb-4">
                        <div className="question-image-container">
                            <img
                                src={gameData[currentQuestion].image}
                                alt="Question"
                                className="question-image"
                            />
                        </div>
                    </div>

                    <div className="row g-3">
                        {gameData[currentQuestion].options.map((option: string, index: number) => (
                            <div key={index} className="col-6">
                                <Button
                                    onClick={() => handleAnswer(option)}
                                    className={`option-button w-100 ${index % 2 === 0 ? 'btn-primary' : 'btn-success'}`}
                                >
                                    {option}
                                </Button>
                            </div>
                        ))}
                    </div>

                    {showRetryMessage && (
                        <div className="text-center mt-3">
                            <div className="text-danger fw-bold">
                                Wrong answer! Please try again.
                                {attempts > 0 && ` (Attempts: ${attempts})`}
                            </div>
                        </div>
                    )}
                </div>
            </Card>

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
        </div>
    );
};

export default TextWord;