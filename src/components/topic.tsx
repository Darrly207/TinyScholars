import React from "react";
import { Image } from "lucide-react";
import { GameSettings } from "../types/game";
import "bootstrap/dist/css/bootstrap.min.css";
interface TopicSettingsProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

const TopicSettings: React.FC<TopicSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div>
      <h3>
        <Image size={20} />
        Topic & Background
      </h3>
      <select
        value={settings.background}
        onChange={(e) =>
          onSettingsChange({ ...settings, background: "abstract" })
        }
      >
        <option value="default">Default</option>
        <option value="nature">Nature</option>
        <option value="space">Space</option>
        <option value="abstract">Abstract</option>
      </select>
    </div>
  );
};

export default TopicSettings;
