import { GovInfobar } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { GovIcon } from '@/components/shared/GovIcon';

interface Props {
  isHidden: boolean;
}

export const WarningInfobar = ({ isHidden }: Props) => {
  const t = useTranslations('Home.FormSection.Step2');

  return (
    <div className={isHidden ? 'hidden' : 'block'}>
      <GovInfobar
        color="warning"
        type="subtle"
        icon={<GovIcon name="exclamation-triangle-fill" />}
      >
        <p className="text-lg">{t('WarningBeforeNextConversion')}</p>
      </GovInfobar>
    </div>
  );
};
