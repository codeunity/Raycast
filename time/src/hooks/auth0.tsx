import { Detail, LocalStorage, OAuth } from "@raycast/api";
import { OAuthService } from "@raycast/utils";
import { useEffect, useState } from "react";

const clientId = "7stgDJlS9Gm1NzYGZVAQSgtVHmXHtpZ0";
const baseUrl = "https://codeunity.eu.auth0.com";
const audience = "https://api-timetracker-prod.azurewebsites.net/api/";
const scope = ["openid", "profile", "email", "offline_access"].join(" ");

const sharedOAuthConfig = {
  clientId,
  scope,
  authorizeUrl: `${baseUrl}/authorize`,
  tokenUrl: `${baseUrl}/oauth/token`,
  refreshTokenUrl: `${baseUrl}/oauth/token`,
  bodyEncoding: "url-encoded" as const,
  extraParameters: { audience, response_type: "code", code_challenge_method: "S256", response_mode: "query" },
};

export type AccountId = "account-1" | "account-2";
export const ACTIVE_ACCOUNT_KEY = "active-account-id";

export let accessToken: string | undefined;

export const oauthClient1 = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "codeunity time",
  providerIcon: "auth0-logo.svg",
  description: "Connect your account",
  providerId: "auth0-account-1",
});

export const oauthClient2 = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "codeunity time",
  providerIcon: "auth0-logo.svg",
  description: "Connect your second account",
  providerId: "auth0-account-2",
});

export const provider1 = new OAuthService({
  ...sharedOAuthConfig,
  client: oauthClient1,
  onAuthorize: ({ token }) => {
    accessToken = token;
  },
});

export const provider2 = new OAuthService({
  ...sharedOAuthConfig,
  client: oauthClient2,
  onAuthorize: ({ token }) => {
    accessToken = token;
  },
});

export async function getActiveAccountId(): Promise<AccountId> {
  const stored = await LocalStorage.getItem<string>(ACTIVE_ACCOUNT_KEY);
  return (stored as AccountId) ?? "account-1";
}

export async function setActiveAccountId(id: AccountId): Promise<void> {
  await LocalStorage.setItem(ACTIVE_ACCOUNT_KEY, id);
}

export function getProviderForAccount(id: AccountId) {
  return id === "account-2" ? provider2 : provider1;
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function authorize() {
      const id = await getActiveAccountId();
      const provider = getProviderForAccount(id);
      const token = await provider.authorize();
      accessToken = token;
      setReady(true);
    }
    authorize();
  }, []);

  if (!ready) return <Detail isLoading />;
  return <>{children}</>;
}

export function withMultiAccountToken<T extends object>(Component: React.ComponentType<T>) {
  return function MultiAccountWrapper(props: T) {
    return (
      <AuthWrapper>
        <Component {...props} />
      </AuthWrapper>
    );
  };
}

export const GetAcessToken = () => {
  if (!accessToken) {
    throw new Error("Access token must be used when authenticated.");
  }
  return { accessToken };
};
