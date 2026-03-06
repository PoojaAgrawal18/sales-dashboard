import { Helmet } from 'react-helmet-async';

import DealsView from 'src/sections/dashboard/deals-view';


// ----------------------------------------------------------------------

export default function DealsPage() {
  return (
    <>
      <Helmet>
        <title>Deals | Sales Dashboard</title>
      </Helmet>

      <DealsView />
    </>
  );
}
