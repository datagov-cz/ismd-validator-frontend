import { GovIcon, GovTooltip } from '@gov-design-system-ce/react';

import { DownloadItemButton } from '@/components/shared/DownloadItemButton';
import { OUTPUT_FORMAT } from '@/lib/constants';
import { useFormStore } from '@/store/formStore';

type TooltipType = {
  title: string;
  description: string;
};

type GovButtonType = {
  text: string;
  type?: 'base' | 'outlined' | 'solid';
  disabled?: boolean;
  downloadType?: 'dictionary' | 'validation-check' | 'incomplete-catalog';
};

export interface DownloadItemRowProps {
  title: string;
  tooltips: TooltipType[];
  govButton: GovButtonType;
}

export const DownloadItemRow = ({
  title,
  tooltips,
  govButton,
}: DownloadItemRowProps) => {
  const downloadData = useFormStore((state) => state.downloadData);

  const handleDownload = () => {
    if (!downloadData) return;

    console.log('Download data:', downloadData);

    let data, filename, mimeType;

    if (govButton.downloadType === 'dictionary') {
      if (OUTPUT_FORMAT === 'json') {
        const jsonData =
          typeof downloadData === 'string'
            ? JSON.parse(downloadData)
            : downloadData;

        data = JSON.stringify(jsonData, null, 2);
        mimeType = 'application/json';
        filename = 'slovnik.json';
      } else if (OUTPUT_FORMAT === 'ttl') {
        data =
          typeof downloadData === 'string'
            ? downloadData
            : String(downloadData);
        mimeType = 'text/turtle';
        filename = 'slovnik.ttl';
      }
    } else if (govButton.downloadType === 'validation-check') {
      // TODO: Implement validation check download logic
      data =
        typeof downloadData === 'string'
          ? JSON.parse(downloadData)
          : downloadData;
      filename = 'validation-report.json';
    } else if (govButton.downloadType === 'incomplete-catalog') {
      // TODO: get incomplete catalog from BE
      filename = 'catalog-record.json';
    } else {
      return;
    }

    const blob = new Blob([data], { type: mimeType });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row lg:items-center w-full justify-between gap-2.5">
        <p>{title}</p>
        <DownloadItemButton
          onClick={handleDownload}
          color="primary"
          type={govButton.type ?? 'solid'}
          disabled={govButton.disabled}
        >
          {govButton.text}
        </DownloadItemButton>
      </div>
      <div className="flex flex-col gap-y-2">
        {tooltips.map((tooltip) => (
          <GovTooltip
            key={tooltip.title}
            size="m"
            color="primary"
            position="top"
            message={tooltip.description}
            className="max-w-max border-b-0! rounded-md hover:bg-blue-primary/10 transition-colors duration-200"
          >
            <GovIcon name="info-circle-fill" />
            <span className="pr-2">{tooltip.title}</span>
          </GovTooltip>
        ))}
      </div>
    </div>
  );
};
