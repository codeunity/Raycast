import { showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { ProjetsResponse } from "../types/Project";
import { GetAcessToken } from "./auth0";

const TimeConfig = {
  baseUrl: "https://api-timetracker-prod.azurewebsites.net/api",
};

export const useTimeClient = () => {
  const { accessToken } = GetAcessToken();

  const getProjects = useFetch<ProjetsResponse>(`${TimeConfig.baseUrl}/projects.get`, {
    onError: (error: { message: string }) => {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to load projects.",
        message: error.message,
      });
    },
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return {
    getProjects,
  };
};
