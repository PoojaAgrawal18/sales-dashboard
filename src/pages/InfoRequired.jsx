import { Helmet } from 'react-helmet-async';

import InfoRequiredView from 'src/sections/info-required-dashboard/info-required-view';


// ----------------------------------------------------------------------

export default function InfoRequiredPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <InfoRequiredView />
    </>
  );
}
