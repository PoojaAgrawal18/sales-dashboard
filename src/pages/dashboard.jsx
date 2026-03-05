import { Helmet } from 'react-helmet-async';

import DashboardView from 'src/sections/dashboard/dashboard-view';


// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Sales Dashboard</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
