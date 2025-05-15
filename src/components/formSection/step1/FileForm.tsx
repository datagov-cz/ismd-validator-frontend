import React from 'react';
import {
  GovButton,
  GovFormControl,
  GovFormFile,
  GovFormGroup,
  GovFormLabel,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

export const FileForm = () => {
  const t = useTranslations('Home.FormSection.Step1.FileForm');

  return (
    <GovFormControl className="w-full max-w-[808px]">
      <GovFormLabel slot="top">{t('Placeholder')}</GovFormLabel>
      <GovFormGroup>
        <GovFormFile accept=".xlsx,.xml,.ttl,.json" expanded>
          <span>{t('Placeholder')}</span>
          <p>
            <GovButton color="primary" size="m" type="outlined">
              {t('Button')}
            </GovButton>
          </p>
          <span className="gov-form-file__note">
            {t('SupportedFormatsLabel')}
          </span>
        </GovFormFile>
      </GovFormGroup>
    </GovFormControl>
  );
};
