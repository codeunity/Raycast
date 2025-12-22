import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { Project } from "../types/Project";
import { CreateTimeRecord } from "./CreateTimeRecord";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectTimeRecords } from "./ProjectTimeRecords";

type ProjectListItemProps = {
  project: Project;
};

export const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
  let icon = Icon.Circle;

  const progress = !project.progress.progress ? 0 : Number(project.progress.progress.replace("%", ""));

  if (progress >= 95) {
    icon = Icon.CircleProgress100;
  } else if (progress >= 75) {
    icon = Icon.CircleProgress75;
  } else if (progress >= 50) {
    icon = Icon.CircleProgress50;
  } else if (progress >= 25) {
    icon = Icon.CircleProgress25;
  }

  return (
    <List.Item
      key={project.id}
      icon={icon}
      title={project.name}
      actions={
        <ActionPanel>
          <Action.Push title="Time Records" icon={Icon.Stopwatch} target={<ProjectTimeRecords project={project} />} />
          <Action.Push title="Create Time Record" icon={Icon.Plus} target={<CreateTimeRecord project={project} />} />
        </ActionPanel>
      }
      detail={<ProjectDetails project={project} />}
    />
  );
};
