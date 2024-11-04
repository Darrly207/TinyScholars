import React, { useContext, useEffect, useState } from "react";
import QuestionList from "../components/questionListLeft";
import {
  GameSettings as GameSettingsType,
  Question,
  MultipleChoiceGame,
  TrueFalse,
  MemoryCard,
  FillInBlankGame,
} from "../types/game";
import MemoryCardGame from "../components/memoryCard";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import SidebarRight from "../components/sidebarRight";
import MultipleChoice from "../components/multipleChoice";
import { FullscreenContext } from "../context/fullScreenContext";
import TrueFalseQuest from "../components/trueFalseQuest";
import FillInBlankQuest from "../components/fillInBlank";
export type GameType = "multipleChoice" | "trueFalse" | "memoryCard";
export type Background = "default" | "nature" | "space" | "abstract";

const GameLayout: React.FC = () => {
  const { containerRef, isFullscreen, setIsFullscreen } =
    useContext(FullscreenContext);
  const [showSideBar, setShowSideBar] = useState(true);
  const handleSidebar = () => {
    showSideBar ? setShowSideBar(false) : setShowSideBar(true);
  };
  const [settings, setSettings] = useState<GameSettingsType>({
    gameType: "multipleChoice",
    background: "default",
    theme: "light",
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      type: "multipleChoice",
      mediaItems: [],
    } as MultipleChoiceGame,
    {
      id: 2,
      text: "Is 2 + 2 = 4?",
      options: ["True", "False"],
      correctAnswer: 0,
      type: "trueFalse",
      mediaItems: [],
    } as TrueFalse,
    {
      id: 3,
      text: "Match the animals with their names",
      type: "memoryCard",
      pairs: [
        {
          description: "Cat",
          image: "/api/placeholder/100/100",
        },
        {
          description: "Dog",
          image: "/api/placeholder/100/100",
        },
        {
          description: "Rabbit",
          image: "/api/placeholder/100/100",
        },
      ],
      mediaItems: [],
    } as MemoryCard,
  ]);
  const [trueFalseQuestion, setTrueFalseQuestion] = useState<TrueFalse[]>([
    {
      id: 1,
      text: "What is 2 + 2 = 4",
      options: ["True", "False"],
      correctAnswer: 1,
      type: "trueFalse",
      mediaItems: [],
    } as TrueFalse,
  ]);

  const [currentQuestionId, setCurrentQuestionId] = useState(1);

  const getCurrentQuestion = () => {
    return questions.find((q) => q.id === currentQuestionId);
  };

  const addQuestion = () => {
    switch (settings.gameType) {
      case "trueFalse":
        const newTFQuestion: TrueFalse = {
          id: questions.length + 1,
          text: "New True/False Question",
          options: ["True", "False"],
          correctAnswer: 0,
          type: "trueFalse",
          mediaItems: [],
        };
        setQuestions([...questions, newTFQuestion]);
        break;

      case "memoryCard":
        const newMemoryQuestion: MemoryCard = {
          id: questions.length + 1,
          text: "New Memory Card Set",
          pairs: [],
          type: "memoryCard",
          mediaItems: [],
        };
        setQuestions([...questions, newMemoryQuestion]);
        break;

      default:
        const newMCQuestion: Question = {
          id: questions.length + 1,
          text: "New Multiple Choice Question",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 0,
          type: "multipleChoice",
          mediaItems: [],
        };
        setQuestions([...questions, newMCQuestion]);
    }
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
    if (currentQuestionId === id) {
      setCurrentQuestionId(questions[0]?.id || 0);
    }
  };

  const handleQuestionUpdate = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  const handleMultipleChoiceUpdate = (updatedQuestion: MultipleChoiceGame) => {
    handleQuestionUpdate(updatedQuestion);
  };

  const handleTrueFalseUpdate = (updatedQuestion: TrueFalse) => {
    handleQuestionUpdate(updatedQuestion);
  };

  const handleMemoryCardUpdate = (updatedQuestion: MemoryCard) => {
    handleQuestionUpdate(updatedQuestion);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isFullscreen) {
      switch (event.key) {
        case "ArrowLeft":
          navigateQuestion(-1);
          break;
        case "ArrowRight":
          navigateQuestion(1);
          break;
      }
    }
  };

  const navigateQuestion = (direction: -1 | 1) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    const newIndex = Math.max(
      0,
      Math.min(questions.length - 1, currentIndex + direction)
    );
    setCurrentQuestionId(questions[newIndex].id);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isFullscreen) {
      switch (event.button) {
        case 0:
          navigateQuestion(1);
          break;
        case 2:
          navigateQuestion(-1);
          break;
      }
    }
  };
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFullscreen]);
  const renderGameComponent = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return <div>No question selected</div>;

    switch (currentQuestion.type) {
      case "multipleChoice":
        return (
          <MultipleChoice
            question={currentQuestion as MultipleChoiceGame}
            onQuestionUpdate={handleMultipleChoiceUpdate as any}
            standalone={false}
          />
        );
      case "trueFalse":
        return (
          <TrueFalseQuest
            question={currentQuestion as TrueFalse}
            onQuestionUpdate={handleTrueFalseUpdate}
          />
        );
      case "memoryCard":
        return (
          <MemoryCardGame
            question={currentQuestion as MemoryCard}
            onQuestionUpdate={handleMemoryCardUpdate}
          />
        );
      case "fillInBlank":
        return (
          <FillInBlankQuest
            question={currentQuestion as FillInBlankGame}
            onQuestionUpdate={handleQuestionUpdate}
          />
        );
      default:
        return <div>Unknown game type</div>;
    }
  };

  return (
    <div
      style={{
        height: "95vh",
        margin: "70px 0px 0px 0px",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex" }}>
        {/* Left Sidebar */}
        <div style={{ flex: 1.5 }}>
          <QuestionList
            questions={questions}
            currentQuestionId={currentQuestionId}
            onQuestionSelect={setCurrentQuestionId}
            onAddQuestion={addQuestion}
            onDeleteQuestion={deleteQuestion}
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            overflow: "hidden",
            flex: 7,
            width: "60vw",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
          ref={containerRef}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
        >
          {renderGameComponent()}
        </div>

        {/* Right Sidebar */}
        <div style={{ flex: 2.5, height: "100vh" }}>
          <div style={{ height: "100%" }}>
            <SidebarRight
              settings={settings}
              onSettingsChange={setSettings}
              currentQuestion={getCurrentQuestion()}
              onQuestionUpdate={handleQuestionUpdate}
              settingShow={true}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "fixed" as "fixed", // Đặt footer cố định
          bottom: 0,
          height: "60px",
          width: "100vw",
        }}
      >
        <Navbar />
      </div>
    </div>
  );
};

export default GameLayout;
