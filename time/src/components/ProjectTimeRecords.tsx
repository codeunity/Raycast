import { Action, ActionPanel, Alert, confirmAlert, Icon, Image, List } from "@raycast/api";
import { orderBy, sum } from "es-toolkit";
import { DateTime } from "luxon";
import { useTimeClient } from "../hooks/useTimeClient";
import { Project } from "../types/Project";
import { CreateUpdateTimeRecord } from "./CreateUpdateTimeRecord";

type ProjectTimeRecordsProps = {
  project: Project;
};

export const ProjectTimeRecords: React.FC<ProjectTimeRecordsProps> = ({ project }) => {
  const { getTimeRecords, deleteTimeRecord } = useTimeClient();
  const { data, isLoading, revalidate } = getTimeRecords(project.id);

  const orderedTimeRecords = orderBy(data?.timeRecords ?? [], ["date"], ["desc"]);
  const totalHours = sum(orderedTimeRecords.map((timeRecord) => timeRecord.duration)) / 100;

  const onDeleteTimeRecord = async (id: number) => {
    if (
      await confirmAlert({
        title: "Delete Time Record",
        message: "Are you sure you want to delete this time record?",
        primaryAction: { title: "Delete", style: Alert.ActionStyle.Destructive },
      })
    ) {
      await deleteTimeRecord(id);
      revalidate();
    }
  };

  return (
    <List isLoading={isLoading} navigationTitle={`Time records -> ${project.name}`}>
      {orderedTimeRecords.length === 0 && (
        <List.EmptyView
          title="No time records found for this project."
          actions={
            <ActionPanel>
              <Action.Push
                title="Create Time Record"
                icon={Icon.Plus}
                target={<CreateUpdateTimeRecord project={project} />}
              />
            </ActionPanel>
          }
        />
      )}
      <List.Section title={`${DateTime.now().toFormat("MMMM")} -> ${totalHours.toFixed(1)}h`}>
        {orderedTimeRecords.map((timeRecord) => (
          <List.Item
            key={timeRecord.id}
            icon={
              timeRecord.userImageUrl
                ? {
                    source: timeRecord.userImageUrl,
                    mask: Image.Mask.Circle,
                  }
                : {
                    source: Icon.PersonCircle,
                  }
            }
            actions={
              <ActionPanel>
                <Action.Push
                  title="Update Time Record"
                  icon={Icon.Pencil}
                  target={
                    <CreateUpdateTimeRecord
                      timeRecord={timeRecord}
                      project={project}
                      onTimeRecordCreated={revalidate}
                    />
                  }
                />
                <Action
                  style={Action.Style.Destructive}
                  shortcut={{ modifiers: ["cmd"], key: "backspace" }}
                  title="Delete Time Record"
                  icon={Icon.Trash}
                  onAction={() => onDeleteTimeRecord(timeRecord.id)}
                />
                <Action.Push
                  title="Create Time Record"
                  icon={Icon.Plus}
                  target={<CreateUpdateTimeRecord project={project} />}
                />
              </ActionPanel>
            }
            title={`${DateTime.fromFormat(timeRecord.date, "yyyy-MM-dd").toFormat("dd.MM")} -> ${(timeRecord.duration / 100).toFixed(1)}h`}
            subtitle={timeRecord.description}
          />
        ))}
      </List.Section>
    </List>
  );
};
