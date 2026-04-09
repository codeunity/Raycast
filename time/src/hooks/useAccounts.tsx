import { showToast, Toast } from "@raycast/api";
import { useCallback, useEffect, useState } from "react";
import {
  AccountId,
  ACTIVE_ACCOUNT_KEY,
  getActiveAccountId,
  oauthClient1,
  oauthClient2,
  provider2,
  setActiveAccountId,
} from "./auth0";

export interface AccountInfo {
  id: AccountId;
  email: string | undefined;
  name: string | undefined;
  isActive: boolean;
}

export function decodeJwtPayload(token: string): { email?: string; name?: string } {
  try {
    const payload = token.split(".")[1];
    if (!payload) return {};
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return {};
  }
}

// Prefer the id_token for display — it always carries profile claims (email, name).
// Fall back to the access token in case the id_token is absent.
async function getDisplayTokenForClient(client: typeof oauthClient1): Promise<string | null> {
  const tokenSet = await client.getTokens();
  return tokenSet?.idToken ?? tokenSet?.accessToken ?? null;
}

async function hasTokenForClient(client: typeof oauthClient1): Promise<boolean> {
  const tokenSet = await client.getTokens();
  return !!tokenSet?.accessToken;
}

export function useAccounts() {
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [activeId, setActiveIdState] = useState<AccountId>("account-1");
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const [id, token1, token2] = await Promise.all([
      getActiveAccountId(),
      getDisplayTokenForClient(oauthClient1),
      getDisplayTokenForClient(oauthClient2),
    ]);

    setActiveIdState(id);

    const result: AccountInfo[] = [];
    if (token1) {
      const claims = decodeJwtPayload(token1);
      result.push({ id: "account-1", email: claims.email, name: claims.name, isActive: id === "account-1" });
    }
    if (token2) {
      const claims = decodeJwtPayload(token2);
      result.push({ id: "account-2", email: claims.email, name: claims.name, isActive: id === "account-2" });
    }

    setAccounts(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const switchTo = useCallback(async (id: AccountId) => {
    await setActiveAccountId(id);
    setActiveIdState(id);
    setAccounts((prev) => prev.map((a) => ({ ...a, isActive: a.id === id })));
    await showToast({ style: Toast.Style.Success, title: "Account switched" });
  }, []);

  const addAccount = useCallback(async () => {
    try {
      await provider2.authorize();
      const token2 = await getDisplayTokenForClient(oauthClient2);
      if (token2) {
        const claims = decodeJwtPayload(token2);
        setAccounts((prev) => {
          const exists = prev.some((a) => a.id === "account-2");
          if (exists) return prev.map((a) => (a.id === "account-2" ? { ...a, ...claims } : a));
          return [...prev, { id: "account-2", email: claims.email, name: claims.name, isActive: false }];
        });
      }
      await showToast({ style: Toast.Style.Success, title: "Account added" });
    } catch {
      await showToast({ style: Toast.Style.Failure, title: "Failed to add account" });
    }
  }, []);

  const removeAccount = useCallback(
    async (id: AccountId) => {
      if (id === "account-1") return;
      await oauthClient2.removeTokens();
      setAccounts((prev) => prev.filter((a) => a.id !== id));
      if (activeId === id) {
        await setActiveAccountId("account-1");
        setActiveIdState("account-1");
      }
      await showToast({ style: Toast.Style.Success, title: "Account removed" });
    },
    [activeId],
  );

  return { accounts, activeId, isLoading, switchTo, addAccount, removeAccount, refresh };
}

export function useActiveAccountDisplay() {
  const [label, setLabel] = useState<string>("");
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    async function load() {
      const [id, hasAcc1, hasAcc2, displayToken1, displayToken2] = await Promise.all([
        getActiveAccountId(),
        hasTokenForClient(oauthClient1),
        hasTokenForClient(oauthClient2),
        getDisplayTokenForClient(oauthClient1),
        getDisplayTokenForClient(oauthClient2),
      ]);

      // Only show the label when both accounts are registered
      if (!hasAcc1 || !hasAcc2) return;

      const activeToken = id === "account-2" ? displayToken2 : displayToken1;
      if (!activeToken) return;
      const claims = decodeJwtPayload(activeToken);
      setLabel(claims.email ?? claims.name ?? "");
      setShowLabel(true);
    }
    load();
  }, []);

  return { label, showLabel };
}
