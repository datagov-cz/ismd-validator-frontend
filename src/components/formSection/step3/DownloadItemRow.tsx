import { GovButton, GovIcon, GovTooltip } from '@gov-design-system-ce/react';

import { DownloadItemButton } from '@/components/shared/DownloadItemButton';
import { useFormStore } from '@/store/formStore';

type TooltipType = {
  title: string;
  description: string;
};

type GovButtonType = {
  text: string;
  type?: 'base' | 'outlined' | 'solid';
  disabled?: boolean;
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

    const data =
      typeof downloadData.output === 'string'
        ? JSON.parse(downloadData.output)
        : downloadData.output;

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slovnik.json-ld';
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
