import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import routes from './routes';
import Nav from './components/Nav';

const router = createBrowserRouter(routes)

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        // backgroundImage: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
        // backgroundImage: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
        // backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
        // backgroundImage: 'linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)',
        backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)',
      }}
    >
      <Nav />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
