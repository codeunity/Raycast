export type Project = {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  projectNumber?: string;
  customerIdFastBill?: string;
  templateIdFastBill?: string;
  articleNumberFastBillOnSite?: string;
  articleNumberFastBillOffSite?: string;
  progress: {
    projectDuration: null | number;
    offerAmount: null | number;
    totalTimeRemote: number;
    totalTimeOnSite: number;
    progress: string;
  };
  involvedUserImageUrls: string[];
  projectImageUrl: null | string;
  city: string;
  street: string;
  postalCode: string;
  projectVisibility: "public" | "customer";
  usersVisibility: null | number[];
};

export type ProjetsResponse = {
  projects: Project[];
};
