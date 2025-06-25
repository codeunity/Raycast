import { Color, Detail, Icon, List } from "@raycast/api";
import {
  climateControl,
  gateway,
  isOn,
  operationMode,
  outdoorTemperature,
  roomTemperature,
  targetTemperature,
} from "../gatewayDeviceUtils";
import { GatewayDevice } from "../types/GatewayDevice";
import { ScheduleDetails } from "./ScheduleDetails";

export const DeviceDetails: React.FC<{
  device: GatewayDevice;
}> = ({ device }) => {
  return (
    <List.Item.Detail
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label
            title="Mode"
            text={`${roomTemperature(device)} -> ${targetTemperature(device)}`}
            icon={
              isOn(device)
                ? operationMode(device) === "cooling"
                  ? { source: Icon.Snowflake, tintColor: Color.Blue }
                  : { source: Icon.Power, tintColor: Color.Green }
                : { source: Icon.Power }
            }
          />
          <Detail.Metadata.Label title="Room Temperature" text={roomTemperature(device)} icon={Icon.Temperature} />
          <Detail.Metadata.Label
            title="Outdoor Temperature"
            text={outdoorTemperature(device)}
            icon={Icon.Temperature}
          />
          <Detail.Metadata.Label
            title="Power Mode"
            text={climateControl(device).isPowerfulModeActive?.value ? "active" : "inactive"}
            icon={
              climateControl(device).isPowerfulModeActive?.value
                ? { source: Icon.Rocket, tintColor: Color.Green }
                : null
            }
          />

          <Detail.Metadata.Separator />

          <ScheduleDetails device={device} />

          <Detail.Metadata.Separator />

          <Detail.Metadata.Label title="Device Model" text={device.deviceModel} />
          <Detail.Metadata.Label
            title="Cloud Connection State"
            text={
              String(device.isCloudConnectionUp)
                ? { value: "up", color: Color.Green }
                : { value: "offline", color: Color.Red }
            }
          />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Gateway Firmware Version" text={gateway(device).firmwareVersion} />
          <Detail.Metadata.Label title="Management Point - Gateway IP Address" text={gateway(device).ipAddress} />
          <Detail.Metadata.Label title="Management Point - Gateway MAC Address" text={gateway(device).macAddress} />
          <Detail.Metadata.Label
            title="Climate Control Error Code"
            text={
              climateControl(device).errorCode?.value === "00-00" ? "no error" : climateControl(device).errorCode?.value
            }
          />
          <Detail.Metadata.Label title="Operation Mode" text={climateControl(device).operationMode} />
        </Detail.Metadata>
      }
    />
  );
};
