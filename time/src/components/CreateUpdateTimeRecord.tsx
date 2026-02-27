import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { FormValidation, useForm } from "@raycast/utils";
import { DateTime } from "luxon";
import { useTimeClient } from "../hooks/useTimeClient";
import { Project } from "../types/Project";
import { TimeRecord } from "../types/TimeRecord";

type TimeRecordValues = {
  date: Date | null;
  description: string;
  duration: number;
  onSite?: boolean;
};

type CreateTimeRecordProps = {
  project: Project;
  timeRecord?: TimeRecord;
  onTimeRecordCreated?: () => void;
};

export const CreateUpdateTimeRecord: React.FC<CreateTimeRecordProps> = ({
  project,
  timeRecord,
  onTimeRecordCreated,
}) => {
  const { pop } = useNavigation();
  const { createTimeRecord, updateTimeRecord } = useTimeClient();

  const { handleSubmit, itemProps } = useForm<TimeRecordValues>({
    async onSubmit() {
      if (!timeRecord) {
        await createTimeRecord({
          projectId: project.id,
          date: DateTime.fromJSDate(itemProps.date.value ?? new Date()).toFormat("yyyy-MM-dd"),
          description: itemProps.description.value ?? "",
          duration: (itemProps.duration.value ?? 0) * 100,
          onSite: itemProps.onSite.value ?? false,
        });
        onTimeRecordCreated?.();
      } else {
        await updateTimeRecord(timeRecord.id, {
          projectId: project.id,
          date: DateTime.fromJSDate(itemProps.date.value ?? new Date()).toFormat("yyyy-MM-dd"),
          description: itemProps.description.value ?? "",
          duration: (itemProps.duration.value ?? 0) * 100,
          onSite: itemProps.onSite.value ?? false,
        });
        onTimeRecordCreated?.();
      }

      pop();
    },
    validation: {
      date: FormValidation.Required,
      description: FormValidation.Required,
      duration: FormValidation.Required,
    },
    initialValues: {
      date: timeRecord ? new Date(timeRecord.date) : new Date(),
      description: timeRecord ? timeRecord.description : "",
      duration: timeRecord ? timeRecord.duration / 100 : 1,
      onSite: timeRecord ? timeRecord.onSite : false,
    },
  });

  return (
    <Form
      navigationTitle={`${timeRecord ? "Update" : "Create"} time record -> ${project.name}`}
      actions={
        <ActionPanel>
          <Action.SubmitForm title={timeRecord ? "Update" : "Create"} onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.DatePicker {...itemProps.date} title="Date" type={Form.DatePicker.Type.Date} />
      <Form.TextField {...itemProps.description} title="Description" autoFocus />
      <Form.TextField
        id="duration"
        title="Duration"
        onChange={(value) => itemProps.duration.onChange?.(parseFloat(value) || 0)}
        value={itemProps.duration.value?.toString()}
        error={itemProps.duration.error}
      />
      <Form.Checkbox {...itemProps.onSite} title="On site" label="" />
    </Form>
  );
};
