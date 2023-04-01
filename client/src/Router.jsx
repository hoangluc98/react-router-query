import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BaseLayout from './layout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Sale, { loader as saleLoader } from './pages/Sale';
import TabContent, { loader as contentLoader } from './pages/Sale/Tabs/TabContent';
import ContentDetail, { loader as dataLoader } from './pages/Sale/Tabs/ContentDetail';
import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();

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
        loader: saleLoader(queryClient),
        children: [
          {
            path: ':tab',
            element: <TabContent />,
            loader: contentLoader(queryClient),
            children: [
              {
                path: ':id',
                loader: dataLoader(queryClient),
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
