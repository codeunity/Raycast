export type Mode = "heating" | "cooling" | "auto" | "dry" | "fanOnly";

export type ValueWithSettable<T> = {
  settable: boolean;
  values: T[];
};

export type StepValueRange = {
  settable: boolean;
  stepValue: number;
  minValue: number;
  maxValue: number;
};

export type FanSpeedMode = {
  currentMode: ValueWithSettable<string>;
  modes?: {
    fixed: StepValueRange;
  };
};

export type FanSpeedConfig = {
  [mode in Mode]: FanSpeedMode;
};

export type RoomTempConfig = {
  [mode in "heating" | "cooling" | "auto"]: StepValueRange;
};

export type ActionTypes = {
  operationMode: ValueWithSettable<"fanOnly" | "heating" | "cooling" | "auto" | "dry" | "off">;
  roomTemperature: RoomTempConfig;
  fanSpeed: FanSpeedConfig;
  econoMode: ValueWithSettable<"on" | "off">;
};
