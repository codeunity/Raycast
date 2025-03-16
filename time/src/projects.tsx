import { List } from "@raycast/api";
import { orderBy } from "es-toolkit";
import { ProjectListItem } from "./components/ProjectListItem";
import { withAuth0AccessToken } from "./hooks/auth0";
import { useTimeClient } from "./hooks/useTimeClient";

function Command() {
  const { data, isLoading } = useTimeClient().getProjects;

  const nonCompletedProjects = data?.projects?.filter((project) => !project.isCompleted) ?? [];
  const ordererProjects = orderBy(nonCompletedProjects, ["id"], ["desc"]);

  return (
    <List isLoading={isLoading} isShowingDetail={true}>
      <List.Section title="Projects">
        {ordererProjects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </List.Section>
    </List>
  );
}
export default withAuth0AccessToken(Command);
