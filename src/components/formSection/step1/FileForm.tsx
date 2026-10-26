import { useState } from 'react';
import {
  GovAttachments,
  GovButton,
  GovFormFile,
  GovFormFileItem,
  GovFormMessage,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { GovIcon } from '@/components/shared/GovIcon';
import { ALLOWED_FILE_SIZE } from '@/lib/constants';
import { useFormStore } from '@/store/formStore';

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FileForm = () => {
  const t = useTranslations('Home.FormSection.Step1.FileForm');
  const [fileItems, setFileItems] = useState<GovFormFileItem[]>([]);

  const files = useFormStore((state) => state.files);
  const addFile = useFormStore((state) => state.addFile);
  const removeFile = useFormStore((state) => state.removeFile);

  const handleFilesUpdated = (updatedFiles: GovFormFileItem[]) => {
    const nextFiles = updatedFiles.slice(-1);

    files.forEach(removeFile);
    if (nextFiles[0]) {
      addFile(nextFiles[0].file);
    }
    setFileItems(nextFiles);
  };

  const handleFileRemove = (fileItem: GovFormFileItem) => {
    handleFilesUpdated(fileItems.filter((item) => item.id !== fileItem.id));
  };

  const attachments = fileItems.length ? (
    <GovAttachments label={t('AttachmentsLabel')}>
      {fileItems.map((fileItem) => (
        <div className="gov-attachments-item" role="listitem" key={fileItem.id}>
          <div className="gov-attachments-item__file">
            <p className="gov-attachments-item__name min-w-0">
              <span className="truncate">{fileItem.file.name}</span>
              <span slot="info">({formatFileSize(fileItem.file.size)})</span>
            </p>
            <GovButton
              color="primary"
              type="base"
              size="s"
              aria-label={t('RemoveFile', {
                fileName: fileItem.file.name,
              })}
              onClick={() => handleFileRemove(fileItem)}
              iconStart={<GovIcon name="x-lg" />}
            />
          </div>
          {!fileItem.acceptValid && (
            <div className="gov-attachments-item__messages">
              <GovFormMessage
                color="error"
                icon={<GovIcon name="exclamation-triangle-fill" />}
              >
                {t('UnsupportedFile')}
              </GovFormMessage>
            </div>
          )}
          {!fileItem.sizeValid && (
            <div className="gov-attachments-item__messages">
              <GovFormMessage
                color="error"
                icon={<GovIcon name="exclamation-triangle-fill" />}
              >
                {t('FileTooLarge', {
                  fileSize: formatFileSize(ALLOWED_FILE_SIZE),
                })}
              </GovFormMessage>
            </div>
          )}
        </div>
      ))}
    </GovAttachments>
  ) : undefined;

  return (
    <GovFormFile
      expanded
      files={fileItems}
      onFilesUpdated={handleFilesUpdated}
      multiple={false}
      maxFileSize={ALLOWED_FILE_SIZE}
      resetAfterPick
      displayAttachments={false}
      attachments={attachments}
      accept=".xlsx,.xml,.ttl,.json-ld"
    >
      <span>{t('Placeholder')}</span>
      <GovButton
        className="self-center"
        color="primary"
        size="m"
        type="outlined"
      >
        {t('Button')}
      </GovButton>
      <span className="gov-form-file__note">{t('SupportedFormatsLabel')}</span>
    </GovFormFile>
  );
};
