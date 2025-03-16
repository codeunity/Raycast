import { Icon, List } from "@raycast/api";
import { Project } from "../types/Project";
import { ProjectDetails } from "./ProjectDetails";

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

  return <List.Item icon={icon} title={project.name} detail={<ProjectDetails project={project} />} />;
};
