import { showToast, Toast } from "@raycast/api";
import { showFailureToast } from "@raycast/utils";
import { GetAcessToken } from "./onectaAuth";

const OnectaConfig = {
  baseUrl: "https://api.onecta.daikineurope.com/v1",
};

export const useOnectaClient = () => {
  const { accessToken } = GetAcessToken();

  const enablePowerfulMode = (deviceId: string) => {
    showToast({ style: Toast.Style.Animated, title: "Enabling power mode..." });

    return fetch(
      `${OnectaConfig.baseUrl}/gateway-devices/${deviceId}/management-points/climateControl/characteristics/powerfulMode`,
      {
        method: "PATCH",
        body: JSON.stringify({ value: "on" }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: "Enabled power mode successfully!",
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to enable power mode.",
          message: error.message,
        });
      });
  };

  const disablePowerfulMode = (deviceId: string) => {
    showToast({ style: Toast.Style.Animated, title: "Disabling power mode..." });

    return fetch(
      `${OnectaConfig.baseUrl}/gateway-devices/${deviceId}/management-points/climateControl/characteristics/powerfulMode`,
      {
        method: "PATCH",
        body: JSON.stringify({ value: "off" }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: "Disabled power mode successfully!",
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to disable power mode.",
          message: error.message,
        });
      });
  };

  const enableCooling = (deviceId: string) => {
    showToast({ style: Toast.Style.Animated, title: "Enabling cooling..." });

    return fetch(
      `${OnectaConfig.baseUrl}/gateway-devices/${deviceId}/management-points/climateControl/characteristics/onOffMode`,
      {
        method: "PATCH",
        body: JSON.stringify({ value: "on" }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: "Enabled cooling successfully!",
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to enable cooling.",
          message: error.message,
        });
      });
  };

  const disableCooling = (deviceId: string) => {
    showToast({ style: Toast.Style.Animated, title: "Disabling cooling..." });

    return fetch(
      `${OnectaConfig.baseUrl}/gateway-devices/${deviceId}/management-points/climateControl/characteristics/onOffMode`,
      {
        method: "PATCH",
        body: JSON.stringify({ value: "off" }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: "Disabled cooling successfully!",
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to disable cooling.",
          message: error.message,
        });
      });
  };

  const setTargetRoomTemperature = (deviceId: string, targetTemperature: number) => {
    showToast({ style: Toast.Style.Animated, title: "Setting target temperature..." });

    return fetch(
      `${OnectaConfig.baseUrl}/gateway-devices/${deviceId}/management-points/climateControl/characteristics/temperatureControl`,
      {
        method: "PATCH",
        body: JSON.stringify({
          path: "/operationModes/cooling/setpoints/roomTemperature",
          value: targetTemperature,
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: `Set target temperature to ${targetTemperature}°C successfully!`,
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to set target temperature.",
          message: error.message,
        });
      });
  };

  const setOperationMode = (deviceId: string, mode: string) => {
    showToast({ style: Toast.Style.Animated, title: "Setting operation mode..." });

    return fetch(
      `${OnectaConfig.baseUrl}/gateway-devices/${deviceId}/management-points/climateControl/characteristics/operationMode`,
      {
        method: "PATCH",
        body: JSON.stringify({
          value: mode,
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: `Set operation mode to ${mode} successfully!`,
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to set operation mode.",
          message: error.message,
        });
      });
  };

  return {
    setOperationMode,
    enablePowerfulMode,
    disablePowerfulMode,
    enableCooling,
    disableCooling,
    setTargetRoomTemperature,
  };
};
