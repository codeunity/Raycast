import { showFailureToast, useFetch } from "@raycast/utils";
import { GatewayDevice } from "../types/GatewayDevice";
import { getAccessToken } from "./onectaAuth";

const OnectaConfig = {
  baseUrl: "https://api.onecta.daikineurope.com/v1",
};

export const useGatewayDevices = () =>
  useFetch<GatewayDevice[]>(`${OnectaConfig.baseUrl}/gateway-devices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken().accessToken}`,
      "Content-Type": "application/json",
    },
    onError: (error) => {
      showFailureToast(error, { title: "Failed to load gateway devices" });
    },
  });
