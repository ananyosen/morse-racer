import { useCallback, useState } from 'react';
import { LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import routes from './routes';
import Nav from './components/Nav';
import { AppContext } from './utils/context';
import { getContextDataFromLocalstorage, storeContextDataToLocalstorage } from './utils/app.utils';
import { IContextState } from './app';
import { DefaultContextData } from './constants/app.constants';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  font-family: "Courier Prime", monospace;
`;

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
      <AppContainer>
        <Nav />
        <LocationProvider>
          <Router>
            {routes.map(({ path, Component }) => (
              <Route path={path} component={Component} key={path} />
            ))}
          </Router>
        </LocationProvider>
      </AppContainer>
    </AppContext.Provider>
  );
}

export default App;
