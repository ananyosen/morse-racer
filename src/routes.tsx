import React from 'react';
import { RouteObject } from 'react-router-dom';

const Racer = React.lazy(() => import('./Racer'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Racer />,
    }
];

export default routes;
