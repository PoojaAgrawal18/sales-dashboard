import { lazy } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const LoginPage = lazy(() => import('src/pages/login'));
export const DashboardApp = lazy(() => import('src/pages/dashboard'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const RCM = lazy(() => import('src/pages/rcm'));
export const Collection = lazy(() => import('src/pages/Collection'));
export const AR = lazy(() => import('src/pages/Ar'));
export const InfoRequired = lazy(() => import('src/pages/InfoRequired'));
export const FirstPass = lazy(() => import('src/pages/FirstPass'));
export const MonthlyCollection = lazy(() => import('src/pages/MonthlyCollection'));
export const SignUp = lazy(() => import('src/pages/sign-up'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'collection', element: <Collection /> },
        { path: 'ar', element: <AR /> },
        { path: 'monthly-collection', element: <MonthlyCollection /> },
        { path: 'first-pass', element: <FirstPass /> },
        { path: 'info-required', element: <InfoRequired /> },
      ],
    },
    {
      path: '/',
      element: <RCM />,
      index: true,
    },
    {
      path: '/login',
      element: <LoginPage />,
      index: true,
    },
    {
      path: '/signup',
      element: <SignUp />,
      index: true,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
