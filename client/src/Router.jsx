import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BaseLayout from './layout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
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
        async lazy() {
          let { Sales, loader } = await import('./pages/Sale');
          return { Component: Sales, loader: loader(queryClient) };
        },
        children: [
          {
            path: ':tab',
            async lazy() {
              let { TabContent, loader } = await import('./pages/Sale/Tabs/TabContent');
              return { Component: TabContent, loader: loader(queryClient) };
            },
            children: [
              {
                path: ':id',
                async lazy() {
                  let { ContentDetail, loader } = await import('./pages/Sale/Tabs/ContentDetail');
                  return { Component: ContentDetail, loader: loader(queryClient) };
                }
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
