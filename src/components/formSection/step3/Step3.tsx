import { GovWizardItem } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

export const Step3 = () => {
  const t = useTranslations('Home.FormSection.Step3');

  return (
    <GovWizardItem color="primary" collapsible>
      <span slot="prefix">3</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
    </GovWizardItem>
  );
};
