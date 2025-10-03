import { Helmet } from 'react-helmet-async';

import DashboardView from 'src/sections/dashboard/dashboard-view';


// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <DashboardView />
    </>
  );
}
