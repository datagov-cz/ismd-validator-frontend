import { GovButton, GovIcon } from '@gov-design-system-ce/react';

type TooltipType = {
  title: string;
  description: string;
};

type GovButtonType = {
  text: string;
  type?: 'base' | 'outlined' | 'solid';
  disabled?: boolean;
};

interface Props {
  title: string;
  tooltips: TooltipType[];
  govButton: GovButtonType;
}

export const DownloadItemRow = ({ title, tooltips, govButton }: Props) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center w-full justify-between gap-2.5">
        <p className="">{title}</p>
        <GovButton
          onGovClick={() => {}}
          color="primary"
          type={govButton.type ?? 'solid'}
          disabled={govButton.disabled}
        >
          <GovIcon name="download" slot="icon-start" />
          {govButton.text}
        </GovButton>
      </div>
      <div className="space-y-2">
        {tooltips.map((tooltip) => (
          <GovButton
            key={tooltip.title}
            color="primary"
            size="s"
            type="base"
            onGovClick={() => {}}
          >
            <GovIcon name="info-circle-fill" slot="icon-start" />
            {tooltip.title}
          </GovButton>
        ))}
      </div>
    </div>
  );
};
