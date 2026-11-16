import axios from 'axios';

import { ConformanceIssueDto } from '@/api/generated';

export interface OfnConformanceFailure {
  errorCode: string;
  message: string;
  data: {
    vocabularyIri: string;
    issues: ConformanceIssueDto[];
  };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const getOfnConformanceFailure = (
  error: unknown,
): OfnConformanceFailure | undefined => {
  const body = axios.isAxiosError(error)
    ? error.response?.data
    : (error as { response?: { data?: unknown } } | null)?.response?.data;

  if (
    !isRecord(body) ||
    body.errorCode !== 'VOCABULARY_OFN_NONCONFORMANT' ||
    typeof body.message !== 'string' ||
    !isRecord(body.data) ||
    typeof body.data.vocabularyIri !== 'string' ||
    !Array.isArray(body.data.issues)
  ) {
    return undefined;
  }

  return body as unknown as OfnConformanceFailure;
};
