export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type Action = {
  operationMode: "off" | "heating" | "cooling" | "auto" | "dry" | "fanOnly";
};

export type DaySchedule = {
  [time in string]?: Action;
};

export type ScheduleActions = {
  [day in Weekday]?: DaySchedule;
};

export type ScheduleMeta = {
  actionPeriods: Weekday[];
  isReadOnly: boolean;
};

export type ScheduleName = {
  maxLength: number;
  settable: boolean;
  value: string;
};

export type ScheduleEntry = {
  name: ScheduleName;
  meta: ScheduleMeta;
  actions: ScheduleActions;
  settable: boolean;
};

export type Schedules = {
  [id: string]: ScheduleEntry;
};
