import { IContextState } from "../app";

export const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
export const baseTime = 130; // ms
export const slopPercentage = 40; // %
export const keyboardBinding = 'Space';
export const toneFrequency = 550;
export const LOW_GAIN = 0.000001;

export const REPO_LINK = 'https://github.com/ananyosen/morse-racer';
export const LOCALSTORAGE_KEY = 'storedAppContext';

export const DefaultContextData: IContextState = {
    wpm: 12,
};
