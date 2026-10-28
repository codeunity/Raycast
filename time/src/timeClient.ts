import { showToast, Toast } from "@raycast/api";
import { showFailureToast, useFetch } from "@raycast/utils";
import { DateTime } from "luxon";
import { getAccessToken } from "./hooks/keycloak";
import { CreateTimeRecord } from "./types/CreateTimeRecord";
import { ProjetsResponse } from "./types/Project";
import { TimeRecordsResponse } from "./types/TimeRecord";

const TimeConfig = {
  baseUrl: "https://backend.timeunity.de/api",
};

const requestHeaders = () => {
  const { accessToken } = getAccessToken();

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const useProjects = () => {
  return useFetch<ProjetsResponse>(`${TimeConfig.baseUrl}/projects.get`, {
    method: "GET",
    headers: requestHeaders(),
    onError: (error) => {
      showFailureToast(error, { title: "Failed to load projects." });
    },
  });
};

export const useTimeRecords = (projectId: number, fromDate?: string, toDate?: string) => {
  const from = fromDate ?? DateTime.now().minus({ months: 1 }).toFormat("yyyy-MM-dd");
  const to = toDate ?? DateTime.now().toFormat("yyyy-MM-dd");

  return useFetch<TimeRecordsResponse>(
    `${TimeConfig.baseUrl}/timerecords.get?projectId=${projectId}&fromDate=${from}&toDate=${to}`,
    {
      method: "GET",
      headers: requestHeaders(),
      onError: (error) => {
        showFailureToast(error, { title: "Failed to load time records for project." });
      },
    },
  );
};

type TimeRecordMutation = {
  path: string;
  body: unknown;
  pendingTitle: string;
  successTitle: string;
  failureTitle: string;
};

const mutateTimeRecords = async (mutation: TimeRecordMutation) => {
  const toast = await showToast({ style: Toast.Style.Animated, title: mutation.pendingTitle });

  try {
    const response = await fetch(`${TimeConfig.baseUrl}/${mutation.path}`, {
      method: "POST",
      body: JSON.stringify(mutation.body),
      headers: requestHeaders(),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    toast.style = Toast.Style.Success;
    toast.title = mutation.successTitle;
  } catch (error) {
    await showFailureToast(error, { title: mutation.failureTitle });
  }
};

export const createTimeRecord = (createTimeRecord: CreateTimeRecord) =>
  mutateTimeRecords({
    path: "timerecords.create-multiple",
    body: [createTimeRecord],
    pendingTitle: "Creating time record...",
    successTitle: "Created time record successfully!",
    failureTitle: "Failed to create time record.",
  });

export const updateTimeRecord = (timeRecordId: number, updateTimeRecord: CreateTimeRecord) =>
  mutateTimeRecords({
    path: "timerecords.update-multiple",
    body: [{ id: timeRecordId, ...updateTimeRecord }],
    pendingTitle: "Updating time record...",
    successTitle: "Updated time record successfully!",
    failureTitle: "Failed to update time record.",
  });

export const deleteTimeRecord = (timeRecordId: number) =>
  mutateTimeRecords({
    path: "timerecords.delete-multiple",
    body: [timeRecordId],
    pendingTitle: "Deleting time record...",
    successTitle: "Deleted time record successfully!",
    failureTitle: "Failed to delete time record.",
  });
