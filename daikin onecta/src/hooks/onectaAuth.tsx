import { getPreferenceValues, OAuth } from "@raycast/api";
import { OAuthService, withAccessToken } from "@raycast/utils";

const preferences = getPreferenceValues<ExtensionPreferences>();
const baseUrl = "https://idp.onecta.daikineurope.com/v1/oidc";
const scope = ["openid", "onecta:basic.integration"].join(" ");

export let accessToken: string | undefined;

export const oauthClient = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Daikin Authentication",
  providerIcon: "DAIKIN_logo.svg",
  description: "Connect your Daikin account",
});

export const provider = new OAuthService({
  client: oauthClient,
  clientId: preferences.clientId,
  scope: scope,
  authorizeUrl: `${baseUrl}/authorize`,
  tokenUrl: `${baseUrl}/token?client_secret=${preferences.clientSecret}`,
  refreshTokenUrl: `${baseUrl}/token?client_secret=${preferences.clientSecret}`,
  bodyEncoding: "url-encoded",
  extraParameters: { response_type: "code", code_challenge_method: "S256", response_mode: "query" },
  onAuthorize: ({ token }) => {
    accessToken = token;
  },
});

export const withDaikinAccessToken = withAccessToken(provider);

export const GetAcessToken = () => {
  if (!accessToken) {
    throw new Error("Access token must be used when authenticated.");
  }

  return {
    accessToken,
  };
};
