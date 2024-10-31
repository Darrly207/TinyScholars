import React from "react";
import { Settings } from "lucide-react";
import type { GameSettings as GameSettingsType, Question } from "../types/game";
import "bootstrap/dist/css/bootstrap.min.css";

export type GameType = "multipleChoice" | "trueFalse" | "memoryCard";

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
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingGame;
