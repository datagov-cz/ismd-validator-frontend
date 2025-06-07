import { DictProcessInfoStatusType } from './appTypes';

export const STATUS_MAP: Record<
  DictProcessInfoStatusType,
  'success' | 'warning' | 'error'
> = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
};
