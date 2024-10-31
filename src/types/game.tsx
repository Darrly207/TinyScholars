export type GameType = "multipleChoice" | "trueFalse" | "memoryCard";
export type Background = "default" | "nature" | "space" | "abstract";

export interface BaseQuestion {
  id: number;
  text: string;
  type: GameType;
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

export type Question = MultipleChoiceGame | TrueFalse | MemoryCard;

export interface GameSettings {
  gameType: GameType;
  background: Background;
  theme: "light" | "dark";
}
