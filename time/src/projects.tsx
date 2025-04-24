import { List } from "@raycast/api";
import { orderBy } from "es-toolkit";
import { ProjectListItem } from "./components/ProjectListItem";
import { withAuth0AccessToken } from "./hooks/auth0";
import { useTimeClient } from "./hooks/useTimeClient";

function Command() {
  const { data, isLoading } = useTimeClient().getProjects;

  const activeProjects = data?.projects?.filter((project) => !project.isCompleted) ?? [];
  const completedProjects = data?.projects?.filter((project) => project.isCompleted) ?? [];

  const ordererActiveProjects = orderBy(activeProjects, ["id"], ["desc"]);
  const ordererCompletedProjects = orderBy(completedProjects, ["id"], ["desc"]);

  return (
    <List isLoading={isLoading} isShowingDetail={true}>
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
export default withAuth0AccessToken(Command);
