import React from "react";
import { TrueFalse } from "../store/types/game";
import VideoComponent from "./mediaVideo";
import "../style/fullScreen.css";

interface TrueFalseQuestProps {
  question: TrueFalse;
  onQuestionUpdate: (question: TrueFalse) => void;
  standalone?: boolean;
}

const TrueFalseQuest: React.FC<TrueFalseQuestProps> = ({
  question,
  onQuestionUpdate,
}) => {
  if (!question || question.type !== "trueFalse") return null;

  return (
    <div className="fullScreen">
      <input
        type="text"
        value={question.text}
        onChange={(e) => {
          onQuestionUpdate({
            ...question,
            text: e.target.value,
          });
        }}
        placeholder="Enter your true/false question here"
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
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseQuest;
