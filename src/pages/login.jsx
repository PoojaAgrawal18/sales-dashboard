import { Helmet } from 'react-helmet-async';

import LoginPageView from 'src/sections/login-page/login-view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <LoginPageView />
    </>
  );
}
