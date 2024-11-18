import {
  SET_GAME_STATUS,
  SET_GAME_SETTINGS,
  ADD_QUESTION,
  REMOVE_QUESTION,
  UPDATE_QUESTION,
  UPDATE_MEME,
} from "../action/gameAction";
import { GameStatus, GameSettings, Question, meme } from "../types/game";

interface GameState {
  status: GameStatus;
  settings: GameSettings;
  questions: Question[];
  memes: meme[];
}

const initialState: GameState = {
  status: "notStarted",
  settings: {
    gameType: "multipleChoice",
    background: "#fff",
    theme: "light",
  },
  questions: [],
  memes: [],
};

export const gameReducer = (state = initialState, action: any): GameState => {
  switch (action.type) {
    case SET_GAME_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case SET_GAME_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };

    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };

    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id ? action.payload : q
        ),
      };

    case UPDATE_MEME:
      return {
        ...state,
        memes: state.memes.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };

    default:
      return state;
  }
};
