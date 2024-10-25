import { IContextState } from "../app";

export const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
export const baseTime = 130; // ms
export const slopPercentage = 40; // %
export const keyboardBinding = 'Space';

export const REPO_LINK = 'https://github.com/ananyosen/morse-racer';
export const LOCALSTORAGE_KEY = 'storedAppContext';

export const DefaultContextData: IContextState = {
    wpm: 12,
};
