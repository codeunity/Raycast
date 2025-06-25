import { showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { GatewayDevice } from "../types/GatewayDevice";
import { GetAcessToken } from "./onectaAuth";

const OnectaConfig = {
  baseUrl: "https://api.onecta.daikineurope.com/v1",
};

export const useGatewayDevices = () =>
  useFetch<GatewayDevice[]>(`${OnectaConfig.baseUrl}/gateway-devices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${GetAcessToken().accessToken}`,
      "Content-Type": "application/json",
    },
    onError: (error) => {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to load gateway devices",
        message: error.message,
      });
    },
  });
