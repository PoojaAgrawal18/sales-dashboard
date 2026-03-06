import { Helmet } from 'react-helmet-async';

import ReportView from 'src/sections/dashboard/report-view';


// ----------------------------------------------------------------------

export default function ReportPage() {
  return (
    <>
      <Helmet>
        <title>Reports | Sales Dashboard</title>
      </Helmet>

      <ReportView />
    </>
  );
}
