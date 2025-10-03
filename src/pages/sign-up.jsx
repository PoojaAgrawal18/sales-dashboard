import { Helmet } from 'react-helmet-async';

import SignUpView from 'src/sections/signup-page/signup-view';


// ----------------------------------------------------------------------

export default function signUp() {
  return (
    <>
      <Helmet>
        <title> RCM | Minimal UI </title>
      </Helmet>

      <SignUpView />
    </>
  );
}
