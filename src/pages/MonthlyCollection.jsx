import { Helmet } from 'react-helmet-async';

import MonthlyCollectionView from 'src/sections/monthly-collection/monthly-collection-view';

// ----------------------------------------------------------------------

export default function MonthlyCollectionPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <MonthlyCollectionView />
    </>
  );
}
