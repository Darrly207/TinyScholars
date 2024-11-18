import React from "react";
import { Trash2, Plus } from "lucide-react";
import { Question } from "../store/types/game";
import "bootstrap/dist/css/bootstrap.min.css";
interface QuestionListProps {
  questions: Question[];
  currentQuestionId: number;
  onQuestionSelect: (id: number) => void;
  onAddQuestion: () => void;
  onDeleteQuestion: (id: number) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  currentQuestionId,
  onQuestionSelect,
  onAddQuestion,
  onDeleteQuestion,
}) => {
  return (
    <div style={{ background: "white", borderRadius: 7, height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{}}>Questions</h2>
        <button
          onClick={onAddQuestion}
          style={{
            // flex: 1,
            width: 35,
            height: 35,
            justifyContent: "center",
            borderRadius: "50px",
          }}
        >
          <Plus size={20} />
        </button>
      </div>
      <div
        style={{
          height: "85vh",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {questions.map((question) => (
          <div
            key={question.id}
            className={`flex justify-between items-center p-3 rounded cursor-pointer ${
              currentQuestionId === question.id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onQuestionSelect(question.id)}
            style={{
              display: "flex",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteQuestion(question.id);
              }}
              style={{ margin: "0px 10px" }}
            >
              <Trash2 size={16} />
            </button>
            <span style={{ cursor: "pointer" }}>Câu hỏi {question.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
