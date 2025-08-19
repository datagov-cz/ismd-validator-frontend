import {
  useDownloadCatalogRecordJSON,
  useDownloadDetailedValidationReportCSV,
} from '@/api/generated';

export interface DownloadItemRowProps {
  data: string | null;
  filename: string;
  mimeType: string;
}

export const handleDownload = ({
  data,
  filename,
  mimeType,
}: DownloadItemRowProps) => {
  if (!data) return;

  const content =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  const blob = new Blob([content], { type: mimeType });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || '';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const fetchFileFromUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    return await response.text();
  } catch (error) {
    console.error('Error fetching file from URL:', error);
    return null;
  }
};

export const getFilenameAndExtension = (
  url: string,
): { filename: string; extension: string } => {
  try {
    const pathname = new URL(url).pathname;
    const lastSegment = pathname.split('/').pop() || '';

    const dotIndex = lastSegment.lastIndexOf('.');
    if (dotIndex === -1) {
      return { filename: lastSegment, extension: '' };
    }

    const filename = lastSegment.substring(0, dotIndex);
    const extension = lastSegment.substring(dotIndex + 1);

    return { filename, extension };
  } catch (error) {
    console.error('Invalid URL:', error);
    return { filename: 'download', extension: '' };
  }
};

export const getMimeType = (extension: string): string => {
  switch (extension) {
    case 'json':
      return 'application/json';
    case 'csv':
      return 'text/csv';
    case 'ttl':
      return 'text/turtle';
    default:
      return 'application/octet-stream';
  }
};

export const prepareDictionaryData = (
  output: unknown,
  format: string,
): string | null => {
  if (!output) return null;

  if (format === 'json') {
    const jsonData = typeof output === 'string' ? JSON.parse(output) : output;
    return JSON.stringify(jsonData, null, 2);
  }

  if (format === 'ttl') {
    return typeof output === 'string' ? output : String(output);
  }

  return null;
};

interface HandleReportDownloadParams {
  data: unknown;
  key: string;
  mutation:
    | ReturnType<typeof useDownloadCatalogRecordJSON>
    | ReturnType<typeof useDownloadDetailedValidationReportCSV>;
  filename: string;
  mimeType: string;
}

export const handleReportDownload = ({
  data,
  key,
  mutation,
  filename,
  mimeType,
}: HandleReportDownloadParams) => {
  const formData = new FormData();
  formData.append(
    key,
    new Blob([JSON.stringify(data)], { type: 'application/json' }),
  );

  mutation.mutate(formData, {
    onSuccess: (downloaded) => {
      handleDownload({ data: downloaded, filename, mimeType });
    },
    onError: (error) => {
      console.error(`Error downloading ${filename}:`, error);
    },
  });
};
