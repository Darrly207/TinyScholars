// useGameLogic.ts
import { useState } from 'react';

export interface GameData {
    image: string;
    options: string[];
    correctAnswer: string;
    category: string;
}

export const gameData: GameData[] = [
    {
        image: "/api/placeholder/400/400",
        options: ["BUFFALO", "CRAB", "BEAR", "CAT"],
        correctAnswer: "BUFFALO",
        category: "Animals"
    },
    {
        image: "/api/placeholder/400/400",
        options: ["APPLE", "BANANA", "ORANGE", "GRAPE"],
        correctAnswer: "APPLE",
        category: "Fruits"
    },
    {
        image: "/api/placeholder/400/400",
        options: ["CAR", "BIKE", "BUS", "TRAIN"],
        correctAnswer: "CAR",
        category: "Vehicles"
    }
];

export const useGameLogic = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [showRetryMessage, setShowRetryMessage] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const handleStartGame = () => {
        setGameStarted(true);
        setScore(0);
        setCurrentQuestion(0);
        setGameFinished(false);
        setShowSuccess(false);
        setShowError(false);
        setShowConfetti(false);
        setShowRetryMessage(false);
        setAttempts(0);
    };

    const handleAnswer = (selectedOption: string) => {
        if (selectedOption === gameData[currentQuestion].correctAnswer) {
            // Correct answer
            setScore(score + 1);
            setShowSuccess(true);
            setShowConfetti(true);
            setShowRetryMessage(false);
            setAttempts(0);

            // Clear success messages after delay
            setTimeout(() => {
                setShowSuccess(false);
                setShowConfetti(false);
            }, 1500);

            // Move to next question after delay
            setTimeout(() => {
                if (currentQuestion < gameData.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                } else {
                    setGameFinished(true);
                }
            }, 1000);
        } else {
            // Wrong answer
            setShowError(true);
            setShowRetryMessage(true);
            setAttempts(attempts + 1);

            // Clear error message after delay
            setTimeout(() => {
                setShowError(false);
            }, 1500);
        }
    };

    const getFinalScore = () => {
        return Math.round((score / gameData.length) * 100);
    };

    return {
        gameStarted,
        currentQuestion,
        score,
        showSuccess,
        showError,
        showConfetti,
        gameFinished,
        showRetryMessage,
        attempts,
        handleStartGame,
        handleAnswer,
        getFinalScore,
        totalQuestions: gameData.length,
        gameData
    };
};