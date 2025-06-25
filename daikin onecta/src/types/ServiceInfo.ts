export type ServiceInfo = {
  app: string; // The service name
  versions: {
    api: string; // API version
    build: string; // Build version
  };
};

export type ServiceInfoResponse = {
  device: ServiceInfo;
  [serviceName: string]: ServiceInfo;
};
