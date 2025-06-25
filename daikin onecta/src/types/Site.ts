export type Location = {
  countryCode: string;
  placeID: string;
  latitude: number;
  longitude: number;
  level: string;
};

export type User = {
  id: string;
  role: string;
};

export type SiteResponse = {
  id: string;
  gatewayDevices: string[];
  name: string;
  role: string;
  location: Location;
  users: User[];
};
