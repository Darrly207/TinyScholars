import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingGame from "./settingGame";
import TopicSettings from "./topic";
import {
  GameSettings,
  GameSettings as GameSettingsType,
  Question,
} from "../store/types/game";
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
  onQuestionUpdate = () => {},
  settingShow = true,
}) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [isSettingView, setIsSettingView] = useState(settingShow);

  const handleSidebarToggle = () => {
    setShowSideBar(!showSideBar);
  };

  const handleViewToggle = (view: boolean) => {
    setIsSettingView(view);
  };

  if (!showSideBar) {
    return (
      <div onClick={handleSidebarToggle} style={{ cursor: "pointer" }}>
        <ChevronLeft size={20} />
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", maxWidth: "22vw" }}>
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
          onClick={() => handleViewToggle(true)}
          style={{
            ...styles.sidebarButton,
            backgroundColor: isSettingView ? "#00FFFF" : undefined,
            color: "black",
          }}
        >
          Cài đặt game
        </button>
        <button
          onClick={() => handleViewToggle(false)}
          style={{
            ...styles.sidebarButton,
            backgroundColor: !isSettingView ? "#00FFFF" : undefined,
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
          {isSettingView ? (
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
              currentQuestion={currentQuestion}
              onQuestionUpdate={onQuestionUpdate}
            />
          )}
        </div>
        {/* <div
          style={{
            width: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleSidebarToggle}
        >
          <ChevronRight size={20} />
        </div> */}
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
