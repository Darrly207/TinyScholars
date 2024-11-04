import React from "react";
import { Image } from "lucide-react";
import { GameSettings } from "../types/game";

interface TopicSettingsProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

const TopicSettings: React.FC<TopicSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="topic-settings">
      <h3 className="settings-title">Topic & Background</h3>

      <div className="background-selector">
        <select
          value={settings.background}
          onChange={(e) =>
            onSettingsChange({ ...settings, background: e.target.value as any })
          }
          className="background-select"
        >
          <option value="default">Default Theme</option>
          <option value="nature">Nature Theme</option>
          <option value="space">Space Theme</option>
          <option value="abstract">Abstract Theme</option>
        </select>
      </div>

      <style>{`
        .topic-settings {
          padding: 16px;
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .settings-title {
          color: #2e3856;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e8eaf2;
        }

        .background-selector {
          position: relative;
        }

        .background-selector::after {
          content: '';
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #6b7280;
          pointer-events: none;
        }

        .background-select {
          width: 100%;
          padding: 12px 16px;
          font-size: 1rem;
          border: 2px solid #e8eaf2;
          border-radius: 8px;
          background: #f8fafc;
          color: #4b5563;
          appearance: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .background-select:hover {
          border-color: #c7d2fe;
          background: #f1f5f9;
        }

        .background-select:focus {
          outline: none;
          border-color: #818cf8;
          box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1);
        }

        .background-select option {
          padding: 12px;
          background: white;
        }

        @media (max-width: 768px) {
          .topic-settings {
            padding: 12px;
          }

          .settings-title {
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }

          .background-select {
            padding: 10px 14px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TopicSettings;
