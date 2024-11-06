export type GameType =
  | "multipleChoice"
  | "trueFalse"
  | "memoryCard"
  | "timeline"
  | "fillInBlank";

export interface BaseQuestion {
  mediaItems: MediaItem[];
  id: number;
  text: string;
  type: GameType;
  background?: string;
  customBackground?: string;
}

export interface MultipleChoiceGame extends BaseQuestion {
  type: "multipleChoice";
  options: string[];
  correctAnswer: number;
}

export interface TrueFalse extends BaseQuestion {
  type: "trueFalse";
  options: ["True", "False"];
  correctAnswer: number;
}

export interface CardPair {
  description: string;
  image: string;
}

export interface MemoryCard extends BaseQuestion {
  type: "memoryCard";
  pairs: CardPair[];
}

export interface FillInBlankGame extends BaseQuestion {
  type: "fillInBlank";
  imageUrl: string;
  correctAnswer: string;
  hint?: string;
}

export type Question =
  | MultipleChoiceGame
  | TrueFalse
  | MemoryCard
  | FillInBlankGame;

export interface GameSettings {
  gameType: GameType;
  background: string;
  theme: "light" | "#c07900";
}
export interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
}
