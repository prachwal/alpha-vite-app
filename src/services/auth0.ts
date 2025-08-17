import { Auth0Client, Auth0ClientOptions } from "@auth0/auth0-spa-js";

const auth0Config: Auth0ClientOptions = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
  cacheLocation: "localstorage" as const,
};

export const auth0 = new Auth0Client(auth0Config);

export const loginWithRedirect = () => auth0.loginWithRedirect();
export const logout = () =>
  auth0.logout({ logoutParams: { returnTo: window.location.origin } });
export const getAccessToken = () => auth0.getTokenSilently();
export const getUser = () => auth0.getUser();
export const isAuthenticated = () => auth0.isAuthenticated();
