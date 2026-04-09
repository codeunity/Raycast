import { Detail, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { orderBy } from "es-toolkit";
import { ProjectListItem } from "./components/ProjectListItem";
import { getActiveAccountId, withAccount1Token, withAccount2Token } from "./hooks/auth0";
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

// Pre-wrap Command for each account using Raycast's official withAccessToken HOC.
// This avoids rolling a custom auth wrapper and lets Raycast handle the full
// OAuth lifecycle (token refresh, error recovery, etc.) correctly.
const CommandAccount1 = withAccount1Token(Command);
const CommandAccount2 = withAccount2Token(Command);

export default function ProjectsEntry() {
  const { data: activeId, isLoading } = usePromise(getActiveAccountId);

  if (isLoading || !activeId) return <Detail isLoading />;
  if (activeId === "account-2") return <CommandAccount2 />;
  return <CommandAccount1 />;
}
