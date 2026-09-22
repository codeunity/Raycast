import { Action, ActionPanel, Icon, List } from "@raycast/api";

import { setMode, unlock, useExivoComponents } from "./exivoClient";
import { getDoorModeTitle } from "./utils/doorMode";

export default function Command() {
  const { data: components, isLoading: loadingComponents, revalidate: revalidateComponents } = useExivoComponents();

  return (
    <List isLoading={loadingComponents}>
      <List.Section title="Doors">
        {components
          ?.filter(
            (x) => x.templateIdentifier === "wireless-digital-cylinder" || x.templateIdentifier === "electric-lock",
          )
          .map((exivoComponent) => (
            <List.Item
              key={exivoComponent.id}
              icon={Icon.LockUnlocked}
              title={exivoComponent.identifier}
              subtitle={{
                value: getDoorModeTitle(exivoComponent.mode),
                tooltip: "Mode",
              }}
              actions={
                <ActionPanel>
                  <Action onAction={() => unlock(exivoComponent.id)} title={`Unlock ${exivoComponent.identifier}`} />
                  {exivoComponent.mode === "normal" ? (
                    <Action
                      onAction={() => {
                        setMode(exivoComponent.id, "open", revalidateComponents);
                      }}
                      title="Activate Permanent Open Mode"
                    />
                  ) : (
                    <Action
                      onAction={() => {
                        setMode(exivoComponent.id, "normal", revalidateComponents);
                      }}
                      title="Activate Normal Mode"
                    />
                  )}
                </ActionPanel>
              }
            />
          ))}
      </List.Section>
    </List>
  );
}
