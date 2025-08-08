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
