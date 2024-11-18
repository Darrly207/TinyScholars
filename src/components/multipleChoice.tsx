import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { X, Image as ImageIcon } from "lucide-react";
import Draggable from "react-draggable";
import imgBackground from "../assets/background1.png";
interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  width: number;
  height: number;
  position: { x: number; y: number };
  isBackground?: boolean;
}

interface MultipleChoiceGame {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  mediaItems: MediaItem[];
  backgroundImage?: string;
}

interface MultipleChoiceProps {
  question: MultipleChoiceGame;
  onQuestionUpdate: (question: MultipleChoiceGame) => void;
  onAnswerSelected?: (answer: number) => void;
  standalone?: boolean;
  background?: string;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onQuestionUpdate,
}) => {
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

  const [draggingFromContainer, setDraggingFromContainer] = useState(false);

  useEffect(() => {
    console.log("Question background:", question.backgroundImage);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedMediaId) {
        handleMediaDelete(selectedMediaId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMediaId]);

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
    const mediaItem = question.mediaItems.find((item) => item.id === id);
    const updatedMediaItems = question.mediaItems.filter(
      (item) => item.id !== id
    );

    onQuestionUpdate({
      ...question,
      mediaItems: updatedMediaItems,
      backgroundImage: mediaItem?.isBackground
        ? undefined
        : question.backgroundImage,
    });
    setSelectedMediaId(null);
  };

  const handleSetAsBackground = (id: string) => {
    const mediaItem = question.mediaItems.find((item) => item.id === id);
    if (mediaItem && mediaItem.type === "image") {
      // Reset any existing background image flags
      const updatedMediaItems = question.mediaItems.map((item) => ({
        ...item,
        isBackground: item.id === id,
      }));

      onQuestionUpdate({
        ...question,
        mediaItems: updatedMediaItems,
        backgroundImage: mediaItem.url,
      });
    }
  };

  const handleDragStart = () => {
    setDraggingFromContainer(true);
  };

  const handleDragStop = (id: string, position: { x: number; y: number }) => {
    setDraggingFromContainer(false);
    handleMediaResize(
      id,
      {
        width: question.mediaItems.find((item) => item.id === id)?.width || 200,
        height:
          question.mediaItems.find((item) => item.id === id)?.height || 200,
      },
      position
    );
  };

  if (!question) return null;

  return (
    <div
      className="game-container"
      style={{
        backgroundImage: question.backgroundImage
          ? `url(${question.backgroundImage})`
          : `url(${imgBackground})`, // Replace with your fallback image URL
      }}
    >
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

        <div
          className="media-container"
          style={{ overflow: "hidden", width: "40%", height: "40%" }}
        >
          {question.mediaItems.map(
            (item) =>
              !item.isBackground && (
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
                  bounds={draggingFromContainer ? "parent" : "window"}
                  enableResizing={{
                    top: false,
                    right: false,
                    bottom: false,
                    left: false,
                    topRight: true,
                    bottomRight: true,
                    bottomLeft: true,
                    topLeft: true,
                  }}
                  onDragStart={handleDragStart}
                  onDragStop={(e, d) =>
                    handleDragStop(item.id, { x: d.x, y: d.y })
                  }
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
                  className={`relative group ${
                    selectedMediaId === item.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onDoubleClick={() => setSelectedMediaId(item.id)}
                >
                  <div className="relative w-full h-full">
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt="Media Item"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-contain"
                      />
                    )}
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.type === "image" && (
                        <button
                          onClick={() => handleSetAsBackground(item.id)}
                          className="p-1 bg-blue-500 text-white rounded-full"
                          title="Set as background"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleMediaDelete(item.id)}
                        className="p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 p-1 bg-gray-800 text-white rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {Math.round(item.width)} x {Math.round(item.height)}
                    </div>
                  </div>
                </Rnd>
              )
          )}
          {question.mediaItems.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              No media added yet
            </div>
          )}
        </div>
      </div>

      <style>{`
        .game-container {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
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
          z-index: 50;
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
          z-index: 40;
          position: relative;
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
          float: right;
          margin-top: 20px;
          width: fit-content;
          background: #ff7f50;
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 20px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          z-index: 50;
          position: relative;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .game-content {
            flex-direction: column;
            align-items: center;
          }

          .media-container, .options-container {
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default MultipleChoice;
