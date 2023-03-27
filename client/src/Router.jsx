import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BaseLayout from './layout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Sale from './pages/Sale';
import TabContent from './pages/Sale/Tabs/TabContent';
import ContentDetail from './pages/Sale/Tabs/ContentDetail';

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
        element: <Sale />,
        children: [
          {
            path: ':tab',
            element: <TabContent />,
            children: [
              {
                path: ':id',
                element: <ContentDetail />
              }
            ]
          }
        ]
      }
    ]
  }
]);

const RouteC = () => {
  return <RouterProvider router={router} />;
};

export default RouteC;
