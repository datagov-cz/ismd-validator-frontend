import { isAxiosError } from 'axios';

import {
  ApiResponseDtoConversionResponseDtoErrorCode as ErrorCode,
  ConformanceIssueDto,
  ConversionResponseDto,
} from '@/api/generated';

/**
 * Body of VOCABULARY_OFN_NONCONFORMANT. Only the error handler returns it, so it is not in the
 * OpenAPI spec (same shape as in ismd-tool).
 */
export interface OfnConformanceFailure {
  vocabularyIri?: string;
  issues?: ConformanceIssueDto[];
}

type ErrorBody = {
  errorCode?: string;
  message?: string;
  data?: unknown;
};

const getErrorBody = (error: unknown): ErrorBody | undefined => {
  const body = isAxiosError(error) ? error.response?.data : undefined;
  return body && typeof body === 'object' ? (body as ErrorBody) : undefined;
};

/**
 * The conversion ran but the validation report has errors, so the backend withholds the output
 * (400 VALIDATION_REPORT_HAS_ERRORS). The results still come as data and are shown like a normal
 * response without a downloadable dictionary.
 */
export const getReportWithErrors = (
  error: unknown,
): { message?: string; data: ConversionResponseDto } | undefined => {
  const body = getErrorBody(error);
  if (
    body?.errorCode === ErrorCode.VALIDATION_REPORT_HAS_ERRORS &&
    body.data &&
    typeof body.data === 'object'
  ) {
    return { message: body.message, data: body.data as ConversionResponseDto };
  }
  return undefined;
};

/** The vocabulary itself is not OFN: what to correct, for VOCABULARY_OFN_NONCONFORMANT. */
export const getOfnConformanceFailure = (
  error: unknown,
): OfnConformanceFailure | undefined => {
  const body = getErrorBody(error);
  if (
    body?.errorCode === ErrorCode.VOCABULARY_OFN_NONCONFORMANT &&
    body.data &&
    typeof body.data === 'object'
  ) {
    return body.data as OfnConformanceFailure;
  }
  return undefined;
};

export const getErrorBodyMessage = (error: unknown): string | undefined =>
  getErrorBody(error)?.message;
