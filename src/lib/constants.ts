import { DictProcessInfoStatusType, OutputFormatType } from './appTypes';

export const STATUS_MAP: Record<
  DictProcessInfoStatusType,
  'success' | 'warning' | 'error'
> = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
};

export const OUTPUT_FORMAT: OutputFormatType =
  (process.env.NEXT_PUBLIC_CONVERT_FORMAT as OutputFormatType) ?? 'json';
