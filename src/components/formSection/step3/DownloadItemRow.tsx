import { GovTooltip } from '@gov-design-system-ce/react';

import { DownloadItemButton } from '@/components/shared/DownloadItemButton';
import { GovIcon } from '@/components/shared/GovIcon';

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
  onClick: () => void;
}

export const DownloadItemRow = ({
  title,
  tooltips,
  govButton,
  onClick,
}: DownloadItemRowProps) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row lg:items-center w-full justify-between gap-2.5">
        <p>{title}</p>
        <DownloadItemButton
          onClick={onClick}
          color="primary"
          type={govButton.type ?? 'solid'}
          disabled={govButton.disabled}
        >
          {govButton.text}
        </DownloadItemButton>
      </div>
      <div className="flex flex-col gap-y-2">
        {tooltips.map((tooltip) => (
          <GovTooltip key={tooltip.title} placement="top">
            <GovTooltip.Trigger className="max-w-max border-b-0! rounded-md hover:bg-blue-primary/10 transition-colors duration-200 flex items-center gap-x-2">
              <GovIcon name="info-circle-fill" />
              <span className="pr-2">{tooltip.title}</span>
            </GovTooltip.Trigger>
            <GovTooltip.Content size="m" color="primary">
              {tooltip.description}
            </GovTooltip.Content>
          </GovTooltip>
        ))}
      </div>
    </div>
  );
};
