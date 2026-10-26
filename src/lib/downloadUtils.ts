import {
  DetailedValidationReportDto,
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
  if (data == null) {
    console.error(`No data available for download: ${filename}`);
    return;
  }

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
  // Give the browser time to start consuming the object URL before releasing it.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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

export const getFileExtension = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    const lastSegment = pathname.split('/').pop() || '';

    const dotIndex = lastSegment.lastIndexOf('.');
    if (dotIndex === -1) {
      return '';
    }

    const extension = lastSegment.substring(dotIndex + 1);

    return extension;
  } catch (error) {
    console.error('Invalid URL:', error);
    return '';
  }
};

export const getFileNameFromUrl = (url: string): string => {
  const encodedFilename = url.substring(url.lastIndexOf('/') + 1);
  const decodedFilename = decodeURIComponent(encodedFilename);
  return decodedFilename.replace(/\.[^/.]+$/, '');
};

export const getMimeType = (extension: string): string => {
  switch (extension) {
    case 'jsonld':
      return 'application/ld+json';
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

  if (format === 'jsonld' || format === 'json') {
    const jsonData = typeof output === 'string' ? JSON.parse(output) : output;
    return JSON.stringify(jsonData, null, 2);
  }

  if (format === 'ttl') {
    return typeof output === 'string' ? output : String(output);
  }

  return null;
};

interface HandleReportDownloadParams {
  data?: DetailedValidationReportDto;
  mutation: ReturnType<typeof useDownloadDetailedValidationReportCSV>;
  filename: string;
  mimeType: string;
}

export const handleReportDownload = ({
  data,
  mutation,
  filename,
  mimeType,
}: HandleReportDownloadParams) => {
  if (!data) return;

  mutation.mutate(
    { data: { detailedReport: data }, params: { filename } },
    {
      onSuccess: (downloaded) => {
        handleDownload({ data: downloaded, filename, mimeType });
      },
      onError: (error) => {
        console.error(`Error downloading ${filename}:`, error);
      },
    },
  );
};
