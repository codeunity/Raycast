export type TimeRecord = {
  id: number;
  date: string;
  onSite: boolean;
  description: string;
  duration: number;
  invoiced: boolean;
  projectId: number;
  userImageUrl: string;
  createdBy: number;
};

export type TimeRecordsResponse = {
  timeRecords: TimeRecord[];
};
