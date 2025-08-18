export interface DownloadItemRowProps {
  data: string | null;
  filename: string;
  mimeType: 'application/json' | 'text/csv' | 'text/turtle';
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
