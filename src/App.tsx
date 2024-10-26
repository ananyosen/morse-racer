import React, { useCallback, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import routes from './routes';
import Nav from './components/Nav';
import { AppContext } from './utils/context';
import { getContextDataFromLocalstorage, storeContextDataToLocalstorage } from './utils/app.utils';
import { IContextState } from './app';
import { DefaultContextData } from './constants/app.constants';
import styled from 'styled-components';

const router = createBrowserRouter(routes);

const AppContainer = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);
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
        <React.Suspense fallback={null}>
          <RouterProvider router={router} />
        </React.Suspense>
      </AppContainer>
    </AppContext.Provider>
  );
}

export default App;
