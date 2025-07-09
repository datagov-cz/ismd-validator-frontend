import {
  GovButton,
  GovFormControl,
  GovFormFile,
  GovFormGroup,
  GovFormLabel,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { useFormStore } from '@/store/formStore';

export const FileForm = () => {
  const t = useTranslations('Home.FormSection.Step1.FileForm');

  const setFile = useFormStore((state) => state.setFile);
  const resetForm = useFormStore((state) => state.reset);

  const handleFileChange = (file?: File) => {
    resetForm();
    if (file) {
      setFile(file);
    }
  };

  return (
    <GovFormControl className="w-full">
      <GovFormLabel slot="top">{t('Placeholder')}</GovFormLabel>
      <GovFormGroup>
        <GovFormFile
          accept=".xlsx,.xml,.ttl,.json,.json-ld"
          expanded
          onGovFiles={(e) => handleFileChange(e.detail.files?.[0].file)}
          multiple={false}
        >
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
