import { Action, ActionPanel, Icon, Image, List } from "@raycast/api";
import { orderBy, sum } from "es-toolkit";
import { DateTime } from "luxon";
import { useTimeClient } from "../hooks/useTimeClient";
import { Project } from "../types/Project";
import { CreateTimeRecord } from "./CreateTimeRecord";

type ProjectTimeRecordsProps = {
  project: Project;
};

export const ProjectTimeRecords: React.FC<ProjectTimeRecordsProps> = ({ project }) => {
  const { getTimeRecords, deleteTimeRecord } = useTimeClient();
  const { data, isLoading, revalidate } = getTimeRecords(project.id);

  const orderedTimeRecords = orderBy(data?.timeRecords ?? [], ["date"], ["desc"]);
  const totalHours = sum(orderedTimeRecords.map((timeRecord) => timeRecord.duration)) / 100;

  const onDeleteTimeRecord = async (id: number) => {
    await deleteTimeRecord(id);
    revalidate();
  };

  return (
    <List isLoading={isLoading} navigationTitle={`Time records -> ${project.name}`}>
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
                  title="Create Time Record"
                  icon={Icon.Plus}
                  target={<CreateTimeRecord project={project} onTimeRecordCreated={revalidate} />}
                />
                <Action
                  title="Delete Time Record"
                  icon={Icon.Trash}
                  onAction={() => onDeleteTimeRecord(timeRecord.id)}
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
