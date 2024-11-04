import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { X } from "lucide-react";
import Draggable from "react-draggable";

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  width: number;
  height: number;
  position: { x: number; y: number };
}

interface MultipleChoiceGame {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  mediaItems: MediaItem[];
}

interface MultipleChoiceProps {
  question: MultipleChoiceGame;
  onQuestionUpdate: (question: MultipleChoiceGame) => void;
  standalone?: boolean;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onQuestionUpdate,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(2);
  const [totalQuestions, setTotalQuestions] = useState(14);

  const handleMediaResize = (
    id: string,
    size: { width: number; height: number },
    position: { x: number; y: number }
  ) => {
    const updatedMediaItems = question.mediaItems.map((item) =>
      item.id === id ? { ...item, ...size, position } : item
    );

    onQuestionUpdate({
      ...question,
      mediaItems: updatedMediaItems,
    });
  };

  const handleMediaDelete = (id: string) => {
    const updatedMediaItems = question.mediaItems.filter(
      (item) => item.id !== id
    );
    onQuestionUpdate({
      ...question,
      mediaItems: updatedMediaItems,
    });
  };

  if (!question) return null;

  return (
    <div className="game-container">
      <Draggable>
        <div className="question-header">
          <input
            type="text"
            value={question.text}
            onChange={(e) => {
              onQuestionUpdate({
                ...question,
                text: e.target.value,
              });
            }}
            placeholder="Enter question here"
            className="question-input"
          />
        </div>
      </Draggable>

      <div className="game-content">
        <div className="options-container">
          {question.options.map((option, index) => (
            <Draggable key={index}>
              <div className="option-wrapper">
                <input
                  type="radio"
                  name="answer"
                  checked={question.correctAnswer === index}
                  onChange={() => {
                    onQuestionUpdate({
                      ...question,
                      correctAnswer: index,
                    });
                  }}
                  className="option-radio"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[index] = e.target.value;
                    onQuestionUpdate({
                      ...question,
                      options: newOptions,
                    });
                  }}
                  className="option-input"
                  placeholder="Nhập câu trả lời"
                />
              </div>
            </Draggable>
          ))}
        </div>

        <div className="media-container">
          {question.mediaItems.map((item) => (
            <Rnd
              key={item.id}
              default={{
                x: item.position.x,
                y: item.position.y,
                width: item.width,
                height: item.height,
              }}
              minWidth={100}
              minHeight={100}
              bounds="parent"
              onDragStop={(e, d) => {
                handleMediaResize(
                  item.id,
                  { width: item.width, height: item.height },
                  { x: d.x, y: d.y }
                );
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                handleMediaResize(
                  item.id,
                  {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                  },
                  position
                );
              }}
              className="relative group"
            >
              <div className="relative w-full h-full">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                )}
                <button
                  onClick={() => handleMediaDelete(item.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 right-2 p-1 bg-gray-800 text-white rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {Math.round(item.width)} x {Math.round(item.height)}
                </div>
              </div>
            </Rnd>
          ))}
          {question.mediaItems.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              No media added yet
            </div>
          )}
        </div>
      </div>

      <div className="question-counter">
        {currentQuestion} / {totalQuestions}
      </div>

      <style>{`
        .game-container {
          width: 100%;
          height: 100vh;
          background: url('/nature-background.jpg') no-repeat center center;
          background-size: cover;
          padding: 20px;
          position: relative;
          font-family: 'Comic Sans MS', cursive;
        }

        .question-header {
          background: linear-gradient(to right, #8e9eab, #6c7b95);
          padding: 15px 30px;
          border-radius: 30px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          margin-bottom: 30px;
          cursor: move;
          width: fit-content;
        }

        .question-input {
          background: transparent;
          border: none;
          color: white;
          font-size: 24px;
          font-weight: bold;
          width: 100%;
          text-align: center;
        }

        .question-input::placeholder {
          color: rgba(255,255,255,0.8);
        }

        .game-content {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-top: 20px;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 50%;
        }

        .option-wrapper {
          background: white;
          padding: 15px 20px;
          border-radius: 25px;
          border: 3px solid #333;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: move;
          transition: transform 0.2s;
        }

        .option-wrapper:hover {
          transform: scale(1.02);
        }

        .option-radio {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .option-input {
          border: none;
          font-size: 18px;
          width: 100%;
          padding: 5px;
          font-family: 'Comic Sans MS', cursive;
        }

        .option-input:focus {
          outline: none;
        }

        .media-container {
          width: 45%;
          aspect-ratio: 1;
          background: white;
          border-radius: 15px;
          border: 3px solid #333;
          overflow: hidden;
          position: relative;
        }

        .question-counter {
          position: fixed;
          bottom: 20px;
          right: 30vw;
          background: #ff7f50;
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 20px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .game-content {
            flex-direction: column;
          }

          .options-container,
          .media-container {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default MultipleChoice;
