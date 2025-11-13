import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtForgotVerifyView } from 'src/sections/auth/jwt';


const metadata = { title: `Forgot verify | Jwt - ${CONFIG.site.name}` };

export default function ForgotVerifyPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtForgotVerifyView />
    </>
  );
}
