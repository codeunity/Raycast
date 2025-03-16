import { OAuth } from "@raycast/api";
import { OAuthService, withAccessToken } from "@raycast/utils";

const clientId = "7stgDJlS9Gm1NzYGZVAQSgtVHmXHtpZ0";
const baseUrl = "https://codeunity.eu.auth0.com";
const audience = "https://api-timetracker-prod.azurewebsites.net/api/";

const scope = ["openid", "profile", "email", "offline_access"].join(" ");

export let accessToken: string | undefined;

export const oauthClient = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "codeunity time",
  providerIcon: "auth0-logo.svg",
  description: "Connect your auth0 account",
  providerId: "auth0",
});

export const provider = new OAuthService({
  client: oauthClient,
  clientId: clientId,
  scope: scope,
  authorizeUrl: `${baseUrl}/authorize`,
  tokenUrl: `${baseUrl}/oauth/token`,
  refreshTokenUrl: `${baseUrl}/oauth/token`,
  bodyEncoding: "url-encoded",
  extraParameters: { audience, response_type: "code", code_challenge_method: "S256", response_mode: "query" },
  onAuthorize: ({ token }) => {
    accessToken = token;
  },
});

export const withAuth0AccessToken = withAccessToken(provider);

export const GetAcessToken = () => {
  if (!accessToken) {
    throw new Error("Access token must be used when authenticated.");
  }

  return {
    accessToken,
  };
};
