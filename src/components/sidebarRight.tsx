import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingGame from "./settingGame";
import TopicSettings from "./topic";
import {
  GameSettings,
  GameSettings as GameSettingsType,
  Question,
} from "../types/game";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons

interface SidebarRightProps {
  settings: GameSettings;
  currentQuestion: Question | undefined;
  onSettingsChange: (settings: GameSettings) => void;
  onQuestionUpdate?: (question: Question) => void;
  settingShow: boolean;
}

const SidebarRight: React.FC<SidebarRightProps> = ({
  settings,
  currentQuestion,
  onSettingsChange,
  onQuestionUpdate = () => {}, // Provide a default no-op function
  settingShow,
}) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const handleSidebar = () => {
    showSideBar ? setShowSideBar(false) : setShowSideBar(true);
  };

  if (!showSideBar) {
    return (
      <div onClick={() => setShowSideBar(true)}>
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
          overflow: "hidden",
        }}
      >
        <button
          onClick={handleSidebar}
          style={{
            ...styles.sidebarButton,
            backgroundColor: settingShow ? "#00FFFF" : undefined,
            color: "black",
          }}
        >
          Cài đặt game
        </button>
        <button
          onClick={() => handleSidebar()}
          style={{
            ...styles.sidebarButton,
            backgroundColor: !settingShow ? "#00FFFF" : undefined,
            color: "black",
          }}
        >
          Chủ đề
        </button>
      </div>
      <div
        style={{
          background: "white",
          height: "calc(100% - 80px)",
          display: "flex",
          padding: "20px",
          borderRadius: 5,
        }}
      >
        <div style={{ width: "100%", background: "white" }}>
          {settingShow ? (
            <SettingGame
              currentQuestion={currentQuestion}
              onQuestionUpdate={onQuestionUpdate}
              settings={settings}
              onSettingsChange={onSettingsChange}
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
