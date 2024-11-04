import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Rnd } from "react-rnd"; // For resizable and draggable functionality
import type {
  GameSettings as GameSettingsType,
  Question,
  MediaItem,
  MultipleChoiceGame,
  TrueFalse,
  MemoryCard,
  FillInBlankGame,
} from "../types/game";

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

  const handleGameTypeChange = (newGameType: GameType) => {
    onSettingsChange({ ...settings, gameType: newGameType });

    if (currentQuestion) {
      let updatedQuestion: Question;

      switch (newGameType) {
        case "trueFalse":
          updatedQuestion = {
            ...currentQuestion,
            type: newGameType,
            options: ["True", "False"],
            correctAnswer: 0,
            mediaItems: [],
          } as TrueFalse;
          break;

        case "memoryCard":
          updatedQuestion = {
            ...currentQuestion,
            type: newGameType,
            pairs: [],
            mediaItems: [],
          } as MemoryCard;
          break;

        case "fillInBlank":
          updatedQuestion = {
            ...currentQuestion,
            type: newGameType,
            correctAnswer: "",
            hint: "Enter hint here",
            mediaItems: [],
          } as FillInBlankGame;
          break;

        default: // multipleChoice
          updatedQuestion = {
            ...currentQuestion,
            type: newGameType,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: 0,
            mediaItems: [],
          } as MultipleChoiceGame;
      }

      onQuestionUpdate(updatedQuestion);
    }
  };

  // Handle media upload
  const handleMediaUpload = async (file: File) => {
    try {
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        alert("Please select an image or video file!");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("File size cannot exceed 10MB!");
        return;
      }

      const mediaUrl = URL.createObjectURL(file);
      const newMediaItem: MediaItem = {
        id: Date.now().toString(),
        url: mediaUrl,
        type: file.type.startsWith("image/") ? "image" : "video",
        width: 400,
        height: 300,
        position: { x: 0, y: 0 },
      };

      if (currentQuestion) {
        const updatedQuestion = {
          ...currentQuestion,
          mediaItems: [...(currentQuestion.mediaItems || []), newMediaItem],
        };
        onQuestionUpdate(updatedQuestion);
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("An error occurred while uploading the media!");
    }
  };

  // Handle media resize and position
  const handleMediaResize = (
    id: string,
    size: { width: number; height: number },
    position: { x: number; y: number }
  ) => {
    if (currentQuestion) {
      const updatedMediaItems = currentQuestion.mediaItems.map((item) =>
        item.id === id ? { ...item, ...size, position } : item
      );

      const updatedQuestion = {
        ...currentQuestion,
        mediaItems: updatedMediaItems,
      };
      onQuestionUpdate(updatedQuestion);
    }
  };

  // Handle media deletion
  const handleMediaDelete = (id: string) => {
    if (currentQuestion) {
      const updatedMediaItems = currentQuestion.mediaItems.filter(
        (item) => item.id !== id
      );
      const updatedQuestion = {
        ...currentQuestion,
        mediaItems: updatedMediaItems,
      };
      onQuestionUpdate(updatedQuestion);
    }
  };

  return (
    <div
      className="p-4 border rounded bg-gray-50"
      style={{ overflow: "hidden" }}
    >
      <div className="space-y-4">
        {/* Game Type Selection */}
        <div>
          <label className="block mb-2 font-medium">Game Type</label>
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

        {/* Media Upload Section */}
        <div className="mt-4">
          <label className="block mb-2 font-medium">Media Upload</label>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,video/*"
            onChange={(e) =>
              e.target.files?.[0] && handleMediaUpload(e.target.files[0])
            }
            multiple
          />

          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
              ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
              hover:border-blue-500 hover:bg-blue-50 transition-colors`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handleMediaUpload(file);
            }}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop media files here, or click to select files
            </p>
          </div>
        </div>

        {/* Media Preview Section */}
        {currentQuestion?.mediaItems &&
          currentQuestion.mediaItems.length > 0 && (
            <div className="mt-4">
              <label className="block mb-2 font-medium">Media Preview</label>
              <div className="relative min-h-[300px] border rounded-lg p-4">
                {currentQuestion.mediaItems.map((item) => (
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
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SettingGame;
