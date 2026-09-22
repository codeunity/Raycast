import { Action, ActionPanel, Icon, List } from "@raycast/api";

import { useMemo } from "react";
import { AccessLogDetails } from "./components/AccessLogDetails";
import { useAccessLogs } from "./exivoClient";
import { groupByComponent } from "./utils/accesslogData";

export default function Command() {
  const { data, isLoading } = useAccessLogs();

  const componentGroups = useMemo(() => groupByComponent(data ?? []), [data]);
  const componentNames = Object.getOwnPropertyNames(componentGroups);

  return (
    <List isLoading={isLoading}>
      <List.Section title="Doors">
        {componentNames.map((component) => (
          <List.Item
            key={component}
            icon={Icon.ArrowRightCircle}
            title={component}
            subtitle={`${componentGroups[component].length} items`}
            actions={
              <ActionPanel>
                <Action.Push
                  title="Show Details"
                  target={<AccessLogDetails component={component} logItems={componentGroups[component]} />}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
