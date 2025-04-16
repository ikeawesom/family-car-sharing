export type responseType = {
  status?: number;
  errorCode?: number;
  errorMsg?: string;
  payload?: any;
};

export type odoType = {
  id: number;
  driver: string;
  odo_reading: number;
  created_at: string;
};
