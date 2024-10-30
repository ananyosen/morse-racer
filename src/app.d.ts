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

export interface IRouteObject {
    path: string;
    Component: React.FunctionComponent;
}


declare global {
    interface Window {
        initial_paragraph: string;
    };
};