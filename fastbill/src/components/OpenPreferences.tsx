import {
  Action,
  ActionPanel,
  Detail,
  openExtensionPreferences,
} from "@raycast/api";

export const OpenPreferences = () => {
  const markdown =
    "## Configuration incomplete\nEmail or api key is missing. Please add your Fastbill credentials in the extension preferences.";

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action
            title="Open Extension Preferences"
            onAction={openExtensionPreferences}
          />
        </ActionPanel>
      }
    />
  );
};
