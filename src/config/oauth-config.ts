import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'YOUR_ISSUER_URL',
  clientId: 'YOUR_CLIENT_ID',
  redirectUri: window.location.origin + '/login-callback',
  scope: 'openid profile email',
};
