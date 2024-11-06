import React, { useState } from "react";
import { Upload } from "lucide-react";
import {
  GameSettings as GameSettingsType,
  Question,
  MediaItem,
} from "../types/game";
import backgroundImages from "../assets/backgroundlogina.png";
interface Topic {
  id: string;
  name: string;
  image: string;
  backgroundStyle: string;
}

const defaultTopics: Topic[] = [
  {
    id: "default",
    name: "Default",
    image: backgroundImages,
    backgroundStyle: "bg-white",
  },
  {
    id: "custom",
    name: "Custom",
    image: "/api/placeholder/160/160",
    backgroundStyle: "",
  },
];

interface TopicSettingsProps {
  settings: GameSettingsType;
  onSettingsChange: (settings: GameSettingsType) => void;
  currentQuestion: Question | undefined;
  onQuestionUpdate: (question: Question) => void;
}

const TopicSettings: React.FC<TopicSettingsProps> = ({
  settings,
  onSettingsChange,
  currentQuestion,
  onQuestionUpdate,
}) => {
  const [topics, setTopics] = useState(defaultTopics);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleTopicSelect = (topicId: string) => {
    onSettingsChange({
      ...settings,
      background: topicId as GameSettingsType["background"],
    });

    if (currentQuestion) {
      const selectedTopic = topics.find((t) => t.id === topicId);
      onQuestionUpdate({
        ...currentQuestion,
        background: selectedTopic?.backgroundStyle || "",
        customBackground:
          topicId === "custom" ? customImage ?? undefined : undefined,
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setCustomImage(imageUrl);

        // Cập nhật custom topic với hình ảnh mới
        const updatedTopics = topics.map((topic) =>
          topic.id === "custom" ? { ...topic, image: imageUrl } : topic
        );
        setTopics(updatedTopics);

        // Cập nhật background cho câu hỏi hiện tại với hình ảnh tùy chỉnh
        handleTopicSelect("custom");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4" style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <h3 className="text-lg font-semibold mb-4">Select Theme</h3>
      <div className="grid grid-cols-2 gap-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
              settings.background === topic.id
                ? "ring-2 ring-cyan-500 shadow-lg"
                : "hover:shadow-md"
            }`}
            onClick={() => handleTopicSelect(topic.id)}
          >
            <div
              className="aspect-square relative"
              style={{ cursor: "pointer" }}
            >
              <img
                src={topic.image}
                alt={topic.name}
                className="w-full h-full object-cover"
              />
              {topic.id === "custom" && (
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Upload Custom</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicSettings;
