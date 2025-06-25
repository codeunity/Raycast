import { Action, ActionPanel, Form, Icon, useNavigation } from "@raycast/api";
import React, { useState } from "react";
import { useOnectaClient } from "../hooks/useOnectaClient";

const modes = [
  { label: "Cooling", value: "cooling", icon: Icon.Snowflake },
  { label: "Auto", value: "auto", icon: Icon.Repeat },
  { label: "Heating", value: "heating", icon: Icon.Temperature },
  { label: "Fan Only", value: "fanOnly", icon: Icon.Wind },
  { label: "Dry", value: "dry", icon: Icon.Humidity },
  { label: "Off", value: "off", icon: Icon.Power },
];

export const SetModeForm: React.FC<{
  deviceId: string;
  currentMode: string;
  onModeSet: () => void;
}> = ({ deviceId, currentMode, onModeSet }) => {
  const { setOperationMode } = useOnectaClient();
  const { pop } = useNavigation();
  const [selectedMode, setSelectedMode] = useState(currentMode);

  const onSubmit = async () => {
    await setOperationMode(deviceId, selectedMode);
    onModeSet();
    pop();
  };

  return (
    <Form
      navigationTitle="Set Operation Mode"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Set Operation Mode" onSubmit={onSubmit} />
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="mode"
        title="Operation Mode"
        defaultValue={selectedMode}
        onChange={(m) => {
          setSelectedMode(m);
        }}
        autoFocus
      >
        {modes.map((mode) => (
          <Form.Dropdown.Item key={mode.value} value={mode.value} title={mode.label} icon={mode.icon} />
        ))}
      </Form.Dropdown>
    </Form>
  );
};
