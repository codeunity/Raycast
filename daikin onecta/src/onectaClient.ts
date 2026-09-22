import { showToast, Toast } from "@raycast/api";
import { showFailureToast } from "@raycast/utils";
import { getAccessToken } from "./hooks/onectaAuth";

const OnectaConfig = {
  baseUrl: "https://api.onecta.daikineurope.com/v1",
};

type CharacteristicUpdate = {
  deviceId: string;
  characteristic: string;
  body: Record<string, unknown>;
  pendingTitle: string;
  successTitle: string;
  failureTitle: string;
};

const patchCharacteristic = async (update: CharacteristicUpdate) => {
  const toast = await showToast({ style: Toast.Style.Animated, title: update.pendingTitle });

  try {
    const { accessToken } = getAccessToken();
    const response = await fetch(
      `${OnectaConfig.baseUrl}/gateway-devices/${update.deviceId}/management-points/climateControl/characteristics/${update.characteristic}`,
      {
        method: "PATCH",
        body: JSON.stringify(update.body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    toast.style = Toast.Style.Success;
    toast.title = update.successTitle;
  } catch (error) {
    await showFailureToast(error, { title: update.failureTitle });
  }
};

export const enablePowerfulMode = (deviceId: string) =>
  patchCharacteristic({
    deviceId,
    characteristic: "powerfulMode",
    body: { value: "on" },
    pendingTitle: "Enabling power mode...",
    successTitle: "Enabled power mode successfully!",
    failureTitle: "Failed to enable power mode.",
  });

export const disablePowerfulMode = (deviceId: string) =>
  patchCharacteristic({
    deviceId,
    characteristic: "powerfulMode",
    body: { value: "off" },
    pendingTitle: "Disabling power mode...",
    successTitle: "Disabled power mode successfully!",
    failureTitle: "Failed to disable power mode.",
  });

export const enableCooling = (deviceId: string) =>
  patchCharacteristic({
    deviceId,
    characteristic: "onOffMode",
    body: { value: "on" },
    pendingTitle: "Enabling cooling...",
    successTitle: "Enabled cooling successfully!",
    failureTitle: "Failed to enable cooling.",
  });

export const disableCooling = (deviceId: string) =>
  patchCharacteristic({
    deviceId,
    characteristic: "onOffMode",
    body: { value: "off" },
    pendingTitle: "Disabling cooling...",
    successTitle: "Disabled cooling successfully!",
    failureTitle: "Failed to disable cooling.",
  });

export const setTargetRoomTemperature = (deviceId: string, targetTemperature: number) =>
  patchCharacteristic({
    deviceId,
    characteristic: "temperatureControl",
    body: { path: "/operationModes/cooling/setpoints/roomTemperature", value: targetTemperature },
    pendingTitle: "Setting target temperature...",
    successTitle: `Set target temperature to ${targetTemperature}°C successfully!`,
    failureTitle: "Failed to set target temperature.",
  });

export const setOperationMode = (deviceId: string, mode: string) =>
  patchCharacteristic({
    deviceId,
    characteristic: "operationMode",
    body: { value: mode },
    pendingTitle: "Setting operation mode...",
    successTitle: `Set operation mode to ${mode} successfully!`,
    failureTitle: "Failed to set operation mode.",
  });
