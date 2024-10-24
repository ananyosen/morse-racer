import { ValidationResponse } from "../app";

export interface ITextViewerProps {
    characters: string[];
    validations: ValidationResponse[];
    currentIndex: number;
};

export interface IMorseKeyProps {
    onMorseKeyDown: VoidFunction;
    onMorseKeyUp: VoidFunction;
};