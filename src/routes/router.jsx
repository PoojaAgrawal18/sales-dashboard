import { lazy } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const LoginPage = lazy(() => import('src/pages/login'));
export const DashboardApp = lazy(() => import('src/pages/dashboard'));
export const DealsPage = lazy(() => import('src/pages/deals'));
export const PipelinePage = lazy(() => import('src/pages/pipeline'));
export const ReportPage = lazy(() => import('src/pages/report'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
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
        { path: 'dashboard/deals', element: <DealsPage /> },
        { path: 'dashboard/pipeline', element: <PipelinePage /> },
        { path: 'dashboard/reports', element: <ReportPage /> },
        // Redirect old routes to dashboard (pages removed; nav points to dashboard)
        { path: 'collection', element: <Navigate to="/dashboard" replace /> },
        { path: 'ar', element: <Navigate to="/dashboard" replace /> },
        { path: 'monthly-collection', element: <Navigate to="/dashboard" replace /> },
        { path: 'first-pass', element: <Navigate to="/dashboard" replace /> },
        { path: 'info-required', element: <Navigate to="/dashboard" replace /> },
      ],
    },
    { path: '/', element: <LoginPage />, index: true },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUp /> },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  return routes;
}
