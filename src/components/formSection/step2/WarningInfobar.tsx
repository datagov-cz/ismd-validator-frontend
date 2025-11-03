import { GovIcon, GovInfobar } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

interface Props {
  isHidden: boolean;
}

export const WarningInfobar = ({ isHidden }: Props) => {
  const t = useTranslations('Home.FormSection.Step2');

  return (
    <div className={isHidden ? 'hidden' : 'block'}>
      <GovInfobar color="warning" type="subtle">
        <GovIcon name="exclamation-triangle-fill" slot="icon" />
        <p className="text-lg">{t('WarningBeforeNextConversion')}</p>
      </GovInfobar>
    </div>
  );
};
