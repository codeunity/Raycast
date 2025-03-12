import { Action, ActionPanel, Detail, openExtensionPreferences } from "@raycast/api";

export const OpenPreferences = () => {
  const markdown =
    "## Configuration incomplete\nClient ID or Client Secret is missing. Please add your Exivo credentials in the extension preferences.";

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
};
