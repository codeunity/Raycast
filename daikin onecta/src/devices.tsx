import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { useState } from "react";
import { DeviceDetails } from "./components/DeviceDetails";
import { SetModeForm } from "./components/SetModeForm";
import { SetTemperatureForm } from "./components/SetTemperatureForm";
import {
  climateControl,
  isOn,
  operationMode,
  ssid,
  targetTemperature,
  targetTemperatureWithoutUnit,
} from "./gatewayDeviceUtils";
import { withDaikinAccessToken } from "./hooks/onectaAuth";
import { useGatewayDevices } from "./hooks/useGatewayDevices";
import { useOnectaClient } from "./hooks/useOnectaClient";

function Command() {
  const { enableCooling, disableCooling, enablePowerfulMode, disablePowerfulMode } = useOnectaClient();
  const { data, isLoading, revalidate: revalidateGatewayDevices } = useGatewayDevices();
  const [waitingForReload, setWaitingForReload] = useState(false);

  const revalidate = (waitUntilRefetchTime: number = 8000) => {
    setWaitingForReload(true);
    setTimeout(() => {
      revalidateGatewayDevices();
      setWaitingForReload(false);
    }, waitUntilRefetchTime);
  };

  return (
    <List isLoading={isLoading || waitingForReload} isShowingDetail>
      {!isLoading &&
        data &&
        data.map((device, index) => (
          <List.Item
            key={index}
            icon={
              isOn(device)
                ? operationMode(device) === "cooling"
                  ? { source: Icon.Snowflake, tintColor: Color.Blue }
                  : { source: Icon.Power, tintColor: Color.Green }
                : { source: Icon.Power }
            }
            title={ssid(device)}
            subtitle={isOn(device) ? `${operationMode(device)} -> ${targetTemperature(device)}` : "Off"}
            detail={<DeviceDetails device={device} />}
            actions={
              <ActionPanel>
                {isOn(device) ? (
                  <>
                    <Action
                      onAction={() => {
                        disableCooling(device.id);
                        revalidate();
                      }}
                      title="Disable Cooling"
                      icon={{ source: Icon.Power, tintColor: Color.Red }}
                    />
                    <Action.Push
                      target={
                        <SetTemperatureForm
                          deviceId={device.id}
                          currentTemperature={targetTemperatureWithoutUnit(device)}
                          onTemperatureSet={revalidate}
                        />
                      }
                      title="Set Room Temperature"
                      icon={Icon.Temperature}
                    />
                    <Action.Push
                      target={
                        <SetModeForm deviceId={device.id} currentMode={operationMode(device)} onModeSet={revalidate} />
                      }
                      title="Set Operation Mode"
                      icon={Icon.Sun}
                    />
                    {climateControl(device).isPowerfulModeActive?.value ? (
                      <Action
                        onAction={() => {
                          disablePowerfulMode(device.id);
                          revalidate();
                        }}
                        title="Disable Power Mode"
                        icon={{ source: Icon.Rocket, tintColor: Color.Red }}
                      />
                    ) : (
                      <Action
                        onAction={() => {
                          enablePowerfulMode(device.id);
                          revalidate();
                        }}
                        title="Enable Power Mode"
                        icon={{ source: Icon.Rocket, tintColor: Color.Green }}
                      />
                    )}
                  </>
                ) : (
                  <Action
                    onAction={() => {
                      enableCooling(device.id);
                      revalidate();
                    }}
                    title="Enable Cooling"
                    icon={{ source: Icon.Power, tintColor: Color.Green }}
                  />
                )}
              </ActionPanel>
            }
          />
        ))}
    </List>
  );
}
export default withDaikinAccessToken(Command);
