import React, { useState, useRef } from "react";
import { Settings, Upload, Image as ImageIcon } from "lucide-react";
import type { GameSettings as GameSettingsType, Question } from "../types/game";
import "bootstrap/dist/css/bootstrap.min.css";

export type GameType =
  | "multipleChoice"
  | "trueFalse"
  | "memoryCard"
  | "fillInBlank";

interface SettingGameProps {
  settings: GameSettingsType;
  currentQuestion: Question | undefined;
  onSettingsChange: (settings: GameSettingsType) => void;
  onQuestionUpdate: (question: Question) => void;
}

const SettingGame: React.FC<SettingGameProps> = ({
  settings,
  currentQuestion,
  onSettingsChange,
  onQuestionUpdate,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleGameTypeChange = (newGameType: GameType) => {
    onSettingsChange({ ...settings, gameType: newGameType });

    if (currentQuestion) {
      let updatedQuestion: Question;

      switch (newGameType) {
        case "trueFalse":
          updatedQuestion = {
            ...currentQuestion,
            type: "trueFalse",
            options: ["True", "False"],
            correctAnswer: 0,
          };
          break;

        case "memoryCard":
          updatedQuestion = {
            ...currentQuestion,
            type: "memoryCard",
            pairs: [],
          } as Question;
          break;

        case "fillInBlank":
          updatedQuestion = {
            ...currentQuestion,
            type: "fillInBlank",
            imageUrl: "/api/placeholder/400/300",
            correctAnswer: "",
            hint: "Nhập gợi ý tại đây",
          } as Question;
          break;

        default: // multipleChoice
          updatedQuestion = {
            ...currentQuestion,
            type: "multipleChoice",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: 0,
          };
      }

      onQuestionUpdate(updatedQuestion);
    }
  };

  // Xử lý cập nhật thông tin cho câu hỏi điền từ
  const handleFillInBlankUpdate = (field: string, value: string) => {
    if (currentQuestion && currentQuestion.type === "fillInBlank") {
      const updatedQuestion = {
        ...currentQuestion,
        [field]: value,
      };
      onQuestionUpdate(updatedQuestion);
    }
  };

  // Xử lý tải ảnh lên
  const handleImageUpload = async (file: File) => {
    try {
      // Kiểm tra loại file
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh!");
        return;
      }

      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB!");
        return;
      }

      // Chuyển file thành URL
      const imageUrl = URL.createObjectURL(file);

      // Cập nhật question với URL mới
      if (currentQuestion && currentQuestion.type === "fillInBlank") {
        handleFillInBlankUpdate("imageUrl", imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Có lỗi xảy ra khi tải ảnh lên!");
    }
  };

  // Xử lý paste ảnh
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) handleImageUpload(file);
        break;
      }
    }
  };

  // Xử lý kéo thả ảnh
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  // Xử lý click để chọn file
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // Xử lý chọn file từ input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  return (
    <div className="p-4 border rounded" style={{ background: "#FFFFCC" }}>
      <h3 className="flex items-center gap-2 mb-4">
        <Settings size={20} />
        Game Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Game Type</label>
          <select
            className="w-full p-2 border rounded"
            value={currentQuestion?.type || settings.gameType}
            onChange={(e) => handleGameTypeChange(e.target.value as GameType)}
          >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="trueFalse">True / False</option>
            <option value="memoryCard">Memory Card</option>
            <option value="fillInBlank">Fill in the Blank</option>
          </select>
        </div>

        {/* Cài đặt riêng cho Fill in the Blank */}
        {currentQuestion?.type === "fillInBlank" && (
          <div className="mt-4 space-y-4">
            {/* Khu vực upload ảnh */}
            <div>
              <label className="block mb-2">Image Upload</label>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileInputChange}
              />

              <div
                ref={dropZoneRef}
                className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                  ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }
                  hover:border-blue-500 hover:bg-blue-50 transition-colors`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClickUpload}
                onPaste={handlePaste}
                tabIndex={0}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} className="text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Kéo thả ảnh vào đây, hoặc click để chọn file
                    <br />
                    <span className="text-xs">
                      Hỗ trợ: kéo thả, paste, chọn file
                    </span>
                  </p>
                </div>
              </div>

              {/* Preview ảnh */}
              {currentQuestion.type === "fillInBlank" &&
                currentQuestion.imageUrl && (
                  <div className="mt-4">
                    <label className="block mb-2">Image Preview</label>
                    <div className="relative border rounded-lg overflow-hidden">
                      <img
                        src={currentQuestion.imageUrl}
                        alt="Preview"
                        className="w-full h-48 object-contain"
                      />
                    </div>
                  </div>
                )}
            </div>

            <div>
              <label className="block mb-2">Correct Answer</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={(currentQuestion as any).correctAnswer || ""}
                onChange={(e) =>
                  handleFillInBlankUpdate("correctAnswer", e.target.value)
                }
                placeholder="Enter correct answer"
              />
            </div>

            <div>
              <label className="block mb-2">Hint (Optional)</label>
              <textarea
                className="w-full p-2 border rounded"
                value={(currentQuestion as any).hint || ""}
                onChange={(e) =>
                  handleFillInBlankUpdate("hint", e.target.value)
                }
                placeholder="Enter hint for players"
                rows={3}
              />
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Tips:</h4>
              <ul className="text-sm text-gray-600 list-disc pl-4">
                <li>Có thể kéo thả ảnh vào khung upload</li>
                <li>Copy và paste ảnh trực tiếp vào khung</li>
                <li>Click để chọn ảnh từ thiết bị</li>
                <li>Hỗ trợ các định dạng: PNG, JPG, JPEG, GIF</li>
                <li>Kích thước tối đa: 5MB</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingGame;
