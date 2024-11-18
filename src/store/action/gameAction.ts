import { GameSettings, GameStatus, meme, Question } from "../types/game";

export const SET_GAME_STATUS = "SET_GAME_STATUS";
export const SET_GAME_SETTINGS = "SET_GAME_SETTINGS";
export const ADD_QUESTION = "ADD_QUESTION";
export const REMOVE_QUESTION = "REMOVE_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const UPDATE_MEME = "UPDATE_MEME";

export const setGameStatus = (status: GameStatus) => ({
  type: SET_GAME_STATUS,
  payload: status,
});

export const setGameSettings = (settings: GameSettings) => ({
  type: SET_GAME_SETTINGS,
  payload: settings,
});

export const addQuestion = (question: Question) => ({
  type: ADD_QUESTION,
  payload: question,
});

export const updateMeme = (meme: meme) => ({
  type: UPDATE_MEME,
  payload: meme,
});
