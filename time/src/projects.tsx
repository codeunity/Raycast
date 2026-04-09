import { List } from "@raycast/api";
import { orderBy } from "es-toolkit";
import { ProjectListItem } from "./components/ProjectListItem";
import { withMultiAccountToken } from "./hooks/auth0";
import { useActiveAccountDisplay } from "./hooks/useAccounts";
import { useTimeClient } from "./hooks/useTimeClient";

function Command() {
  const { data, isLoading } = useTimeClient().getProjects;
  const { label, showLabel } = useActiveAccountDisplay();

  const activeProjects = data?.projects?.filter((project) => !project.isCompleted) ?? [];
  const completedProjects = data?.projects?.filter((project) => project.isCompleted) ?? [];

  const ordererActiveProjects = orderBy(activeProjects, ["id"], ["desc"]);
  const ordererCompletedProjects = orderBy(completedProjects, ["id"], ["desc"]);

  return (
    <List isLoading={isLoading} isShowingDetail={true} navigationTitle={showLabel ? label : undefined}>
      <List.Section title="Active projects">
        {ordererActiveProjects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </List.Section>
      <List.Section title="Completed projects">
        {ordererCompletedProjects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </List.Section>
    </List>
  );
}

export default withMultiAccountToken(Command);
