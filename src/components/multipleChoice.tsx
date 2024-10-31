import React from "react";
import { MultipleChoiceGame } from "../types/game";
import VideoComponent from "./mediaVideo";
import "../style/fullScreen.css";
interface MultipleChoiceProps {
  question: MultipleChoiceGame;
  onQuestionUpdate: (question: MultipleChoiceGame) => void;
  standalone?: boolean;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onQuestionUpdate,
}) => {
  if (!question) return null;

  return (
    <div className="fullScreen" style={{}}>
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
      />
      <div>
        <VideoComponent />
      </div>
      <div className="optionsContainer">
        {question.options.map((option, index) => (
          <div key={index} className="option">
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
              placeholder="Hãy nhập câu trả lời ở đây"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MultipleChoice;
