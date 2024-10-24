import { ValidationResponse } from "../app";

export interface ITextViewerProps {
    characters: string[];
    validations: ValidationResponse[];
    currentIndex: number;
};

export interface IMorseKeyProps {
    onMorseKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    onMorseKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};