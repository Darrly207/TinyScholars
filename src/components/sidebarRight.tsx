import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingGame from "./settingGame";
import TopicSettings from "./topic";
import { GameSettings as GameSettingsType, Question } from "../types/game";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons

interface SidebarRightProps {
  settings: GameSettingsType;
  onSettingsChange: (settings: GameSettingsType) => void;
  currentQuestion?: Question;
  onQuestionUpdate?: (question: Question) => void;
}

const SidebarRight: React.FC<SidebarRightProps> = ({
  settings,
  onSettingsChange,
  currentQuestion,
  onQuestionUpdate,
}) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [settingShow, setSettingShow] = useState(true);

  const handleSidebar = () => {
    setSettingShow(true);
  };

  if (!showSideBar) {
    return (
      <div
        style={{
          width: "30px",
          height: "100vh",
          background: "#C0C0C0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => setShowSideBar(true)}
      >
        <ChevronLeft size={20} />
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div
        style={{
          display: "flex",
          borderRadius: 5,
          padding: 20,
          justifyContent: "space-around",
          background: "#808080",
          overflow: "hidden",
        }}
      >
        <button
          onClick={handleSidebar}
          style={{
            ...styles.sidebarButton,
            backgroundColor: settingShow ? "#606060" : undefined,
            color: "black",
          }}
        >
          Cài đặt game
        </button>
        <button
          onClick={() => setSettingShow(false)}
          style={{
            ...styles.sidebarButton,
            backgroundColor: !settingShow ? "#606060" : undefined,
            color: "black",
          }}
        >
          Chủ đề
        </button>
      </div>
      <div
        style={{
          background: "#C0C0C0",
          height: "calc(100% - 80px)",
          display: "flex",
          padding: "20px",
        }}
      >
        <div style={{ width: "100%" }}>
          {settingShow ? (
            <SettingGame
              settings={settings}
              onSettingsChange={onSettingsChange}
              currentQuestion={currentQuestion!}
              onQuestionUpdate={onQuestionUpdate!}
            />
          ) : (
            <TopicSettings
              settings={settings}
              onSettingsChange={onSettingsChange}
              key={settings.gameType}
            />
          )}
        </div>
        <div
          style={{
            width: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setShowSideBar(false)}
        >
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebarButton: {
    flex: 1,
    cursor: "pointer",
    borderRadius: 7,
    height: "5vh",
    margin: "0px 7px",
    border: "none",
    padding: "8px 16px",
    color: "white",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#606060",
    },
  },
} as const;

export default SidebarRight;
