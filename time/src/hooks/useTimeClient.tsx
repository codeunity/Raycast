import { showToast, Toast } from "@raycast/api";
import { showFailureToast, useFetch } from "@raycast/utils";
import { DateTime } from "luxon";
import { CreateTimeRecord } from "../types/CreateTimeRecord";
import { ProjetsResponse } from "../types/Project";
import { TimeRecordsResponse } from "../types/TimeRecord";
import { GetAccessToken } from "./auth0";

const TimeConfig = {
  baseUrl: "https://backend.timeunity.de/api",
};

export const useTimeClient = () => {
  const { accessToken } = GetAccessToken();

  const getProjects = useFetch<ProjetsResponse>(`${TimeConfig.baseUrl}/projects.get`, {
    onError: (error: { message: string }) => {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to load projects.",
        message: error.message,
      });
    },
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const getTimeRecords = (projectId: number, fromDate?: string, toDate?: string) => {
    const from = fromDate ?? DateTime.now().minus({ months: 1 }).toFormat("yyyy-MM-dd");
    const to = toDate ?? DateTime.now().toFormat("yyyy-MM-dd");

    return useFetch<TimeRecordsResponse>(
      `${TimeConfig.baseUrl}/timerecords.get?projectId=${projectId}&fromDate=${from}&toDate=${to}`,
      {
        onError: (error: { message: string }) => {
          showToast({
            style: Toast.Style.Failure,
            title: "Failed to load time records for project.",
            message: error.message,
          });
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
  };

  const createTimeRecord = (createTimeRecord: CreateTimeRecord) => {
    showToast({ style: Toast.Style.Animated, title: "Creating time record..." });

    return fetch(`${TimeConfig.baseUrl}/timerecords.create-multiple`, {
      method: "POST",
      body: JSON.stringify([createTimeRecord]),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: "Created time record successfully!",
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to create time record.",
          message: error.message,
        });
      });
  };

  const updateTimeRecord = (timeRecordId: number, updateTimeRecord: CreateTimeRecord) => {
    showToast({ style: Toast.Style.Animated, title: "Updating time record..." });

    return fetch(`${TimeConfig.baseUrl}/timerecords.update-multiple`, {
      method: "POST",
      body: JSON.stringify([{ id: timeRecordId, ...updateTimeRecord }]),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: "Updated time record successfully!",
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to update time record.",
          message: error.message,
        });
      });
  };

  const deleteTimeRecord = (timeRecordId: number) => {
    showToast({ style: Toast.Style.Animated, title: "Deleting time record..." });

    return fetch(`${TimeConfig.baseUrl}/timerecords.delete-multiple`, {
      method: "POST",
      body: JSON.stringify([timeRecordId]),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: "Deleted time record successfully!",
        });
      })
      .catch((error: { message: string }) => {
        showFailureToast(error, {
          title: "Failed to delete time record.",
          message: error.message,
        });
      });
  };

  return {
    getProjects,
    getTimeRecords,
    createTimeRecord,
    updateTimeRecord,
    deleteTimeRecord,
  };
};
