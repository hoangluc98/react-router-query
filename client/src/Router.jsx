import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BaseLayout from './layout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Sale from './pages/Sale';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: 'accounts',
        element: <Account />
      },
      {
        path: 'sales',
        element: <Sale />
      }
    ]
  }
]);

const RouteC = () => {
  return <RouterProvider router={router} />;
};

export default RouteC;
