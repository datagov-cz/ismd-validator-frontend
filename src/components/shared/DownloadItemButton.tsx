import { ReactNode } from 'react';
import { GovIcon } from '@gov-design-system-ce/react';

interface Props {
  onClick: () => void;
  color?: 'primary' | 'secondary';
  type?: 'base' | 'solid' | 'outlined';
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

export const DownloadItemButton = ({
  type = 'solid',
  onClick,
  className,
  children,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 px-4 flex justify-center gap-x-3 items-center whitespace-nowrap flex-nowrap appearance-none rounded-lg font-bold cursor-pointer transition-colors duration-200 ${type === 'solid' ? 'bg-blue-primary text-dark-text hover:bg-blue-hover' : 'border-blue-primary border text-blue-primary hover:text-blue-hover hover:border-blue-hover hover:bg-blue-outlined-hover'} ${className || ''}`}
      disabled={type === 'base' ? false : undefined}
    >
      <GovIcon name="download" slot="icon-start" className="size-4" />
      {children}
    </button>
  );
};
