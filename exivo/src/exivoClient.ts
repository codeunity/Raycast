import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { showFailureToast, useFetch } from "@raycast/utils";
import { DateTime } from "luxon";
import { AccessLogItem } from "./types/AccessLogItem";
import { ExivoComponent, ExivoComponentMode } from "./types/ExivoComponent";
import { getDoorModeTitle } from "./utils/doorMode";

const ExivoConfig = {
  baseUrl: "https://api.exivo.io/v1",
};

const siteUrl = (path: string) => {
  const { siteId } = getPreferenceValues<Preferences>();
  return `${ExivoConfig.baseUrl}/${siteId}${path}`;
};

const requestHeaders = () => {
  const { clientId, clientSecret } = getPreferenceValues<Preferences>();

  return {
    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    "Content-Type": "application/json",
  };
};

export const useExivoComponents = () => {
  return useFetch<ExivoComponent[]>(siteUrl("/component"), {
    headers: requestHeaders(),
    onError: (error) => {
      showFailureToast(error, { title: "Failed to load components." });
    },
  });
};

export const useAccessLogs = () => {
  const from = DateTime.now().startOf("day").minus({ days: 3 }).toFormat("yyyy-MM-dd");

  return useFetch<AccessLogItem[]>(siteUrl(`/accesslog/component?from=${from}&limit=200`), {
    headers: requestHeaders(),
    onError: (error) => {
      showFailureToast(error, { title: "Failed to load access logs." });
    },
  });
};

export const unlock = async (componentId: string) => {
  const toast = await showToast({ style: Toast.Style.Animated, title: "Unlocking door..." });

  try {
    const response = await fetch(siteUrl(`/component/${componentId}/unlock`), {
      method: "POST",
      headers: requestHeaders(),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    toast.style = Toast.Style.Success;
    toast.title = "Door unlocked successfully!";
  } catch (error) {
    await showFailureToast(error, { title: "Failed to unlock door." });
  }
};

export const setMode = async (componentId: string, mode: ExivoComponentMode, onSuccess: () => void) => {
  const toast = await showToast({ style: Toast.Style.Animated, title: "Setting mode for door..." });

  try {
    const response = await fetch(siteUrl(`/component/${componentId}/mode`), {
      method: "POST",
      body: JSON.stringify({ mode }),
      headers: requestHeaders(),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    onSuccess();
    toast.style = Toast.Style.Success;
    toast.title = `Set mode '${getDoorModeTitle(mode)}' successfully!`;
  } catch (error) {
    await showFailureToast(error, { title: "Failed to set mode for door." });
  }
};
