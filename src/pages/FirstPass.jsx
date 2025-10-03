import { Helmet } from 'react-helmet-async';

import FirstPassView from 'src/sections/first-pass-ratio/first-pass-view';


// ----------------------------------------------------------------------

export default function FirstPassPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <FirstPassView />
    </>
  );
}
