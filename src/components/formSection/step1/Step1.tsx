import React from 'react';
import {
  GovFormLabel,
  GovFormRadio,
  GovFormRadioGroup,
  GovWizardItem,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { FileForm } from './FileForm';

export const Step1 = () => {
  const t = useTranslations('Home.FormSection.Step1');

  return (
    <GovWizardItem color="primary" collapsible isExpanded>
      <span slot="prefix">1</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      <div className="text-dark-primary">
        <GovFormRadioGroup>
          <GovFormRadio value="file">
            <GovFormLabel slot="label">{t('FileForm.Label')}</GovFormLabel>
          </GovFormRadio>
          <FileForm />
          <GovFormRadio value="url">
            <GovFormLabel slot="label">{t('UrlForm.Label')}</GovFormLabel>
          </GovFormRadio>
          <GovFormRadio value="dict">
            <GovFormLabel slot="label">{t('DictForm.Label')}</GovFormLabel>
          </GovFormRadio>
        </GovFormRadioGroup>
      </div>
    </GovWizardItem>
  );
};
