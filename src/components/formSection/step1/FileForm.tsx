import { useRef } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInputRef = useRef<any>(null);

  const files = useFormStore((state) => state.files);
  const addFile = useFormStore((state) => state.addFile);
  const removeFile = useFormStore((state) => state.removeFile);

  const handleFileAdd = (e: CustomEvent) => {
    const file = e.detail.file?.file;
    if (file) {
      if (files.length > 0) {
        removeFile(files[0]);
        if (fileInputRef.current) {
          const firstAttachment = fileInputRef.current.querySelector(
            '.gov-attachments-item__file button',
          );
          if (firstAttachment) {
            firstAttachment.click();
          }
        }
      }
      addFile(file);
    }
  };

  const handleFileRemove = (e: CustomEvent) => {
    const file = e.detail.file?.file;
    if (file) {
      removeFile(file);
    }
  };

  return (
    <GovFormControl className="w-full">
      <GovFormLabel slot="top">{t('Placeholder')}</GovFormLabel>
      <GovFormGroup>
        <GovFormFile
          ref={fileInputRef}
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
