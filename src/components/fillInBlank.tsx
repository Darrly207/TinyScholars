import React, { useState, useEffect } from "react";
import { BaseQuestion } from "../store/types/game";

interface FillInBlankGame extends BaseQuestion {
  type: "fillInBlank";
  imageUrl: string;
  correctAnswer: string;
  hint?: string;
}

// Mảng các dấu tiếng Việt
const VIETNAMESE_MARKS = [
  { mark: "", name: "Không dấu" },
  { mark: "\u0300", name: "Huyền" }, // dấu huyền
  { mark: "\u0301", name: "Sắc" }, // dấu sắc
  { mark: "\u0303", name: "Ngã" }, // dấu ngã
  { mark: "\u0309", name: "Hỏi" }, // dấu hỏi
  { mark: "\u0323", name: "Nặng" }, // dấu nặng
];

interface Props {
  question: FillInBlankGame;
  onQuestionUpdate: (question: FillInBlankGame) => void;
  standalone?: boolean;
}

const FillInBlankQuest: React.FC<Props> = ({
  question,
  onQuestionUpdate,
  standalone = false,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [showDiacritics, setShowDiacritics] = useState(false);
  const [selectedChar, setSelectedChar] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Hàm thêm dấu cho ký tự - đã sửa để tránh lỗi iteration
  const addMarkToChar = (
    str: string,
    position: number,
    mark: string
  ): string => {
    if (position < 0 || position >= str.length) return str;

    // Chuyển string thành array an toàn
    const chars: string[] = Array.from(str);
    chars[position] = chars[position] + mark;
    return chars.join("");
  };

  // Xử lý khi người dùng nhập văn bản
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
    setIsCorrect(null);
  };

  // Xử lý khi click vào ký tự để thêm dấu
  const handleCharClick = (index: number) => {
    setSelectedChar(index);
    setShowDiacritics(true);
  };

  // Xử lý khi chọn dấu
  const handleMarkSelection = (mark: string) => {
    if (selectedChar !== null) {
      const newAnswer = addMarkToChar(userAnswer, selectedChar, mark);
      setUserAnswer(newAnswer);
      setShowDiacritics(false);
      setSelectedChar(null);
    }
  };

  // Kiểm tra câu trả lời
  const checkAnswer = () => {
    const isAnswerCorrect =
      userAnswer.toLowerCase().trim() ===
      question.correctAnswer.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
  };

  // Hàm tạo mảng ký tự an toàn từ string
  const getCharArray = (str: string): string[] => {
    return Array.from(str);
  };

  // Click bên ngoài để đóng bảng chọn dấu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDiacritics &&
        !(event.target as Element).closest(".diacritics-panel")
      ) {
        setShowDiacritics(false);
        setSelectedChar(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDiacritics]);

  return (
    <div className="flex flex-col items-center p-6 max-w-2xl mx-auto">
      {/* Ảnh câu hỏi */}
      <div className="mb-6 w-full">
        <img
          src={question.imageUrl}
          alt="Question"
          className="w-full h-64 object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Câu hỏi */}
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>

      {/* Khu vực nhập đáp án */}
      <div className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập đáp án của bạn..."
          />

          {/* Hiển thị các ký tự để thêm dấu */}
          <div className="mt-2 flex flex-wrap gap-2">
            {getCharArray(userAnswer).map((char, index) => (
              <button
                key={index}
                onClick={() => handleCharClick(index)}
                className={`px-2 py-1 border rounded ${
                  selectedChar === index ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {char}
              </button>
            ))}
          </div>

          {/* Bảng chọn dấu */}
          {showDiacritics && (
            <div className="absolute z-10 mt-2 p-2 bg-white border rounded-lg shadow-lg diacritics-panel">
              {VIETNAMESE_MARKS.map((mark, index) => (
                <button
                  key={index}
                  onClick={() => handleMarkSelection(mark.mark)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                >
                  {`a${mark.mark} (${mark.name})`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nút kiểm tra */}
        <button
          onClick={checkAnswer}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Kiểm tra
        </button>

        {/* Hiển thị kết quả */}
        {isCorrect !== null && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              isCorrect
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isCorrect ? "Chính xác!" : "Chưa đúng, hãy thử lại!"}
            {!isCorrect && question.hint && (
              <p className="mt-2 text-sm">Gợi ý: {question.hint}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FillInBlankQuest;
