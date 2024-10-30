import { useCallback, useState } from 'react';
import { LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import routes from './routes';
import Nav from './components/Nav';
import { AppContext } from './utils/context';
import { getContextDataFromLocalstorage, storeContextDataToLocalstorage } from './utils/app.utils';
import { IContextState } from './app';
import { DefaultContextData } from './constants/app.constants';
import './App.css';

function App() {
  const [contextState, setContextState] = useState<IContextState>({
    ...DefaultContextData,
    ...getContextDataFromLocalstorage()
  });

  const updateContext = useCallback((newState: Partial<IContextState>) => {
    setContextState((oldState) => {
      const updatedState = {
        ...oldState,
        ...newState
      };
      storeContextDataToLocalstorage(updatedState);
      return updatedState;
    })
  }, [setContextState]);

  return (
    <AppContext.Provider value={{contextState, updateContext}}>
      <div className="app-container">
        <Nav />
        <LocationProvider>
          <Router>
            {routes.map(({ path, Component }) => (
              <Route path={path} component={Component} key={path} />
            ))}
          </Router>
        </LocationProvider>
      </div>
    </AppContext.Provider>
  );
}

export default App;
