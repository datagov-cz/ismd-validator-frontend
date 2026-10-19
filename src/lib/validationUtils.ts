import { ValidationResultsDto } from '@/api/generated';

import { DictProcessInfoStatusType } from './appTypes';

const ERROR_SEVERITIES = new Set(['error', 'chyba']);
const INFO_SEVERITIES = new Set(['info', 'information', 'informace']);

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.error('Invalid URL:', err);
    return false;
  }
};

export const getDictionaryStatus = (
  validationResults?: ValidationResultsDto,
): DictProcessInfoStatusType => {
  const severities =
    validationResults?.severityGroups
      ?.map((group) => group.severity?.toLocaleLowerCase())
      .filter((severity): severity is string => !!severity) ?? [];

  if (severities.some((severity) => ERROR_SEVERITIES.has(severity))) {
    return 'Error';
  }

  if (severities.some((severity) => !INFO_SEVERITIES.has(severity))) {
    return 'Warning';
  }

  return 'Success';
};
