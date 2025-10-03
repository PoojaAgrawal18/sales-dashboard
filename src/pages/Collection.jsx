import { Helmet } from 'react-helmet-async';

import CollectionView from 'src/sections/collection-ratio/collectiion-view';

// ----------------------------------------------------------------------

export default function CollectionPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <CollectionView />
    </>
  );
}
