import { ValidationResponse } from "../../app";

export interface ITextViewerProps {
    characters: string[];
    validations: ValidationResponse[];
    currentIndex: number;
};

export interface IMorseKeyProps {
    onMorseKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    onMorseKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

export interface IMorseDisplay {
    morseBuffer: string;
};

export interface IMorseState {
    validations: ValidationResponse[];
    currentIndex: number;
    morseBuffer: string;
};

export interface IConfigModalProps {
    open: boolean;
    closeModal: VoidFunction;
};
