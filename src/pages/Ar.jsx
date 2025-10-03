import { Helmet } from 'react-helmet-async';

import ArView from 'src/sections/ar-pendency/ar-view';


// ----------------------------------------------------------------------

export default function ArPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <ArView />
    </>
  );
}
