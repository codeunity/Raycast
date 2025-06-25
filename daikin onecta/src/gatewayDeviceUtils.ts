import { GatewayDevice } from "./types/GatewayDevice";
import { ScheduleEntry } from "./types/Schedules";

export const ssid = (device: GatewayDevice) => {
  return device.managementPoints.find((dev) => !!dev.ssid)?.ssid?.value.toString() ?? "";
};

export const isOn = (device: GatewayDevice) => {
  return device.managementPoints.find((dev) => !!dev.onOffMode)?.onOffMode?.value.toString() === "on";
};

export const operationMode = (device: GatewayDevice) => {
  return device.managementPoints.find((dev) => !!dev.operationMode)?.operationMode?.value.toString() ?? "";
};

export const climateControl = (device: GatewayDevice) => {
  // TODO: Handle case where climateControl management point is not found
  return device.managementPoints.find((dev) => dev.embeddedId === "climateControl")!;
};

export const gateway = (device: GatewayDevice) => {
  // TODO: Handle case where climateControl management point is not found
  return device.managementPoints.find((dev) => dev.embeddedId === "gateway")!;
};

export const roomTemperature = (device: GatewayDevice) => {
  return `${climateControl(device).sensoryData?.value.roomTemperature.value ?? ""}${climateControl(device).sensoryData?.value.roomTemperature.unit ?? ""}`;
};

export const outdoorTemperature = (device: GatewayDevice) => {
  return `${climateControl(device).sensoryData?.value.outdoorTemperature.value ?? ""}${climateControl(device).sensoryData?.value.outdoorTemperature.unit ?? ""}`;
};

export const targetTemperatureWithoutUnit = (device: GatewayDevice) => {
  const mode = operationMode(device);
  return `${climateControl(device).temperatureControl?.value.operationModes[mode].setpoints.roomTemperature.value ?? ""}`;
};

export const targetTemperature = (device: GatewayDevice) => {
  const mode = operationMode(device);
  return `${targetTemperatureWithoutUnit(device)}${climateControl(device).temperatureControl?.value.operationModes[mode].setpoints.roomTemperature.unit ?? ""}`;
};

export const getSchedules = (device: GatewayDevice) => {
  const schedules: ScheduleEntry[] = [];
  const scheduleEntries = Object.getOwnPropertyNames(climateControl(device).schedule?.value.modes.any.schedules ?? {});

  for (const scheduleEntry of scheduleEntries) {
    const schedule = climateControl(device).schedule?.value.modes.any.schedules[scheduleEntry];
    if (schedule && Object.getOwnPropertyNames(schedule.actions).length > 0) {
      schedules.push(schedule);
    }
  }
  return schedules;
};
