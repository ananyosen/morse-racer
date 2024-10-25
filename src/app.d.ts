export type ValidationResponse =
| 'pending'
| 'valid'
| 'invalid';

export interface IContextState {
    wpm: number;
};

export interface IAppContext {
    contextState?: IContextState;
    updateContext?: (updatedData: Partial<IContextState>) => void;
}