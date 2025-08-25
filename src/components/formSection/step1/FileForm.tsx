import { useEffect } from 'react';
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

  const files = useFormStore((state) => state.files);
  const addFile = useFormStore((state) => state.addFile);
  const removeFile = useFormStore((state) => state.removeFile);
  const setFileError = useFormStore((state) => state.setFileError);

  const handleFileAdd = (e: CustomEvent) => {
    const file = e.detail.file?.file;
    if (file) {
      addFile(file);
      if (files.length >= 1) {
        setFileError(t('MultipleFilesError'));
      } else {
        setFileError(undefined);
      }
    }
  };

  const handleFileRemove = (e: CustomEvent) => {
    const file = e.detail.file?.file;
    if (file) {
      removeFile(file);
    }
  };

  useEffect(() => {
    if (files.length < 2) {
      setFileError(undefined);
    }
  }, [files, setFileError]);

  return (
    <GovFormControl className="w-full">
      <GovFormLabel slot="top">{t('Placeholder')}</GovFormLabel>
      <GovFormGroup>
        <GovFormFile
          accept=".xlsx,.xml,.ttl,.json-ld"
          expanded
          onGovAddFile={handleFileAdd}
          onGovRemoveFile={handleFileRemove}
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
