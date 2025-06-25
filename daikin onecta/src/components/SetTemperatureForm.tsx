import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import React from "react";
import { useOnectaClient } from "../hooks/useOnectaClient";

const temperatures = [
  "18",
  "18.5",
  "19",
  "19.5",
  "20",
  "20.5",
  "21",
  "21.5",
  "22",
  "22.5",
  "23",
  "23.5",
  "24",
  "24.5",
  "25",
  "25.5",
  "26",
  "26.5",
  "27",
  "27.5",
  "28",
  "28.5",
  "29",
  "29.5",
  "30",
  "30.5",
  "31",
  "31.5",
  "32",
];

export const SetTemperatureForm: React.FC<{
  deviceId: string;
  currentTemperature: string;
  onTemperatureSet: () => void;
}> = ({ deviceId, currentTemperature, onTemperatureSet }) => {
  const { setTargetRoomTemperature } = useOnectaClient();
  const { pop } = useNavigation();

  const onSubmit = async (values: { temperature: string }) => {
    const temperature = parseFloat(values.temperature);
    await setTargetRoomTemperature(deviceId, temperature);
    onTemperatureSet();
    pop();
  };

  return (
    <Form
      navigationTitle="Set Target Room Temperature"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Set Temperature" onSubmit={onSubmit} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="temperature" title="Target Temperature" defaultValue={currentTemperature} autoFocus>
        {temperatures.map((temp) => (
          <Form.Dropdown.Item key={temp} value={temp} title={`${temp}°C`} />
        ))}
      </Form.Dropdown>
    </Form>
  );
};
