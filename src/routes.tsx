import React from 'react';
import { lazy } from 'preact-iso';
import { IRouteObject } from './app';

const Racer = lazy(() => import('./components/Racer'));

const routes: IRouteObject[] = [
    {
        path: '/',
        Component: Racer,
    }
];

export default routes;
