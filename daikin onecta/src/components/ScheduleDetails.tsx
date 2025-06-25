import { Detail } from "@raycast/api";
import { Fragment } from "react/jsx-runtime";
import { getSchedules } from "../gatewayDeviceUtils";
import { GatewayDevice } from "../types/GatewayDevice";
import { Action, DaySchedule } from "../types/Schedules";

const getDayScheduleText = (daySchedule: DaySchedule) => {
  const times = Object.keys(daySchedule).sort();
  if (times.length === 0) {
    return "No actions scheduled";
  }
  return times
    .map((time) => {
      const action = daySchedule[time] as unknown as Action;
      if (action) {
        return `${time} -> ${action.operationMode}`;
      }
    })
    .join("\n");
};

export const ScheduleDetails: React.FC<{
  device: GatewayDevice;
}> = ({ device }) => {
  const schedules = getSchedules(device);

  return (
    <>
      {schedules.map((schedule, index) => (
        <Fragment key={`${index}_schedule`}>
          <Detail.Metadata.Label title={`Schedule: ${!schedule.name.value ? index + 1 : schedule.name.value}`} />
          <Detail.Metadata.Label
            key={`${index}_monday`}
            title="Monday"
            text={getDayScheduleText(schedule.actions.monday!)}
          />
          <Detail.Metadata.Label
            key={`${index}_tuesday`}
            title="Tuesday"
            text={getDayScheduleText(schedule.actions.tuesday!)}
          />
          <Detail.Metadata.Label
            key={`${index}_wednesday`}
            title="Wednesday"
            text={getDayScheduleText(schedule.actions.wednesday!)}
          />
          <Detail.Metadata.Label
            key={`${index}_thursday`}
            title="Thursday"
            text={getDayScheduleText(schedule.actions.thursday!)}
          />
          <Detail.Metadata.Label
            key={`${index}_friday`}
            title="Friday"
            text={getDayScheduleText(schedule.actions.friday!)}
          />
          <Detail.Metadata.Label
            key={`${index}_saturday`}
            title="Saturday"
            text={getDayScheduleText(schedule.actions.saturday!)}
          />
          <Detail.Metadata.Label
            key={`${index}_sunday`}
            title="Sunday"
            text={getDayScheduleText(schedule.actions.sunday!)}
          />
        </Fragment>
      ))}
    </>
  );
};
