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

const router = createBrowserRouter(routes);

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
      <div
        style={{
          minHeight: '100vh',
          // backgroundImage: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
          // backgroundImage: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
          // backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
          // backgroundImage: 'linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)',
          backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)',
        }}
      >
        <Nav />
        <React.Suspense fallback={null}>
          <RouterProvider router={router} />
        </React.Suspense>
      </div>
    </AppContext.Provider>
  );
}

export default App;
