import { ActionTypes } from "./ActionTypes";
import { Schedules } from "./Schedules";

export type ValueWrapper<T> = {
  value: T;
  settable: boolean;
  maxLength?: number;
  stepValue?: number;
  minValue?: number;
  maxValue?: number;
  unit?: string;
  values?: T[];
};

export type ConsumptionPeriod = (number | null)[];
export type ConsumptionData = {
  unit: string;
  heating: {
    d: ConsumptionPeriod;
    w: ConsumptionPeriod;
    m: ConsumptionPeriod;
  };
  cooling: {
    d: ConsumptionPeriod;
    w: ConsumptionPeriod;
    m: ConsumptionPeriod;
  };
};

export type FanModeConfig = {
  currentMode: ValueWrapper<string>;
  modes?: {
    fixed: {
      value: number;
      stepValue: number;
      minValue: number;
      maxValue: number;
      settable: boolean;
    };
  };
};

export type FanDirectionConfig = {
  horizontal: {
    currentMode: ValueWrapper<string>;
  };
  vertical: {
    currentMode: ValueWrapper<string>;
  };
};

export type FanControl = {
  ref: string;
  settable: boolean;
  value: {
    operationModes: {
      [mode: string]: {
        fanSpeed: FanModeConfig;
        fanDirection: FanDirectionConfig;
      };
    };
  };
};

export type Schedule = {
  ref: string;
  settable: boolean;
  value: {
    currentMode: ValueWrapper<string>;
    nextAction: {
      operationMode: string;
      startTime: string;
      actionPeriod: string;
    };
    modes: {
      [mode: string]: {
        currentSchedule: ValueWrapper<string>;
        enabled: ValueWrapper<boolean>;
        meta: {
          minIntervalBetweenActions: string;
          maxSchedules: number;
          maxActionsPerActionPeriod: number;
          consecutiveActionsAllowed: boolean;
          actionTypes: ActionTypes;
        };
        schedules: Schedules;
      };
    };
  };
};

export type TemperatureControl = {
  ref: string;
  settable: boolean;
  value: {
    operationModes: {
      [mode: string]: {
        setpoints: {
          roomTemperature: ValueWrapper<number>;
        };
      };
    };
  };
};

export type ManagementPoint = {
  embeddedId: string;
  managementPointType: string;
  managementPointCategory: string;
  managementPointSubType?: string;
  errorCode?: ValueWrapper<string>;
  firmwareVersion?: ValueWrapper<string>;
  isFirmwareUpdateSupported?: ValueWrapper<boolean>;
  isInErrorState?: ValueWrapper<boolean>;
  isInWarningState?: ValueWrapper<boolean>;
  isInCautionState?: ValueWrapper<boolean>;
  ipAddress?: ValueWrapper<string>;
  macAddress?: ValueWrapper<string>;
  modelInfo?: ValueWrapper<string>;
  serialNumber?: ValueWrapper<string>;
  ssid?: ValueWrapper<string>;
  name?: ValueWrapper<string>;
  onOffMode?: ValueWrapper<string>;
  operationMode?: ValueWrapper<string>;
  powerfulMode?: ValueWrapper<string>;
  isPowerfulModeActive?: ValueWrapper<boolean>;
  isHolidayModeActive?: ValueWrapper<boolean>;
  softwareVersion?: ValueWrapper<string>;
  holidayMode?: {
    ref: string;
    settable: boolean;
    value: {
      enabled: boolean;
    };
  };
  fanControl?: FanControl;
  schedule?: Schedule;
  sensoryData?: {
    ref: string;
    settable: boolean;
    value: Record<string, ValueWrapper<number>>;
  };
  temperatureControl?: TemperatureControl;
  consumptionData?: {
    ref: string;
    settable: boolean;
    value: {
      electrical: ConsumptionData;
    };
  };
};

export type GatewayDevice = {
  id: string;
  deviceModel: string;
  type: string;
  embeddedId: string;
  timestamp: string;
  isCloudConnectionUp: ValueWrapper<boolean>;
  managementPoints: ManagementPoint[];
};
