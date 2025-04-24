import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { FormValidation, useForm } from "@raycast/utils";
import { DateTime } from "luxon";
import { useTimeClient } from "../hooks/useTimeClient";
import { Project } from "../types/Project";

type TimeRecordValues = {
  date: Date | null;
  description: string;
  duration: number;
  onSite?: boolean;
};

type CreateTimeRecordProps = {
  project: Project;
  onTimeRecordCreated?: () => void;
};

export const CreateTimeRecord: React.FC<CreateTimeRecordProps> = ({ project, onTimeRecordCreated }) => {
  const { pop } = useNavigation();
  const { createTimeRecord } = useTimeClient();
  const { handleSubmit, itemProps } = useForm<TimeRecordValues>({
    async onSubmit() {
      await createTimeRecord({
        projectId: project.id,
        date: DateTime.fromJSDate(itemProps.date.value ?? new Date()).toFormat("yyyy-MM-dd"),
        description: itemProps.description.value ?? "",
        duration: (itemProps.duration.value ?? 0) * 100,
        onSite: itemProps.onSite.value ?? false,
      });
      onTimeRecordCreated?.();
      pop();
    },
    validation: {
      date: FormValidation.Required,
      description: FormValidation.Required,
      duration: FormValidation.Required,
    },
    initialValues: {
      date: new Date(),
      description: "",
      duration: 1,
      onSite: false,
    },
  });

  return (
    <Form
      navigationTitle={`Create time record -> ${project.name}`}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create" onSubmit={handleSubmit} />
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
