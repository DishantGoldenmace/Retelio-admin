import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import JwtResetPasswordView from 'src/sections/auth/jwt/jwt-reset-password-view';


const metadata = { title: `Reset Password | Jwt - ${CONFIG.site.name}` };

export default function ForgotVerifyPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtResetPasswordView />
    </>
  );
}
