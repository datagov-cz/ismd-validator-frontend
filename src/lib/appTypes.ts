export type DictProcessInfoStatusType = 'Success' | 'Warning' | 'Error';

export type StatusType = {
  status: DictProcessInfoStatusType;
  message?: string;
};
