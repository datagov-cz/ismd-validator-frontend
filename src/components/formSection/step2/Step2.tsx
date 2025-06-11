import { useState } from 'react';
import {
  GovButton,
  GovIcon,
  GovInfobar,
  GovWizardItem,
} from '@gov-design-system-ce/react';
import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';

import { useConvertFile } from '@/api/generated';
import { useFormStore } from '@/store/formStore';

export const Step2 = () => {
  const t = useTranslations('Home.FormSection.Step2');

  const formFile = useFormStore((state) => state.file);
  const formUrl = useFormStore((state) => state.url);

  const [conversionError, setConversionError] = useState<string | null>(null);

  const setDictionaryStatus = useFormStore(
    (state) => state.setDictionaryStatus,
  );
  const setDownloadData = useFormStore((state) => state.setDownloadData);

  const convertMutation = useConvertFile();

  const handleConvert = () => {
    if (!formFile) return;
    setConversionError(null);

    const formData = new FormData();
    formData.append('file', formFile);

    convertMutation.mutate(formData, {
      onError: (error) => {
        console.error('Error converting file:', error);
        const errorMessage = (error as AxiosError).message || 'Unknown error';
        setConversionError(errorMessage);
        setDictionaryStatus(null);
      },
      onSuccess: (data) => {
        if (typeof data === 'object' && data !== null) {
          // TODO: Set dictionary status based on the response from the server
          setDictionaryStatus({
            status: 'Success',
            message: 'File converted successfully',
          });
          setDownloadData(data);
        } else {
          console.error('Unexpected data format', data);
          setConversionError('Unexpected data format received from the server');
        }
      },
    });
  };

  return (
    <GovWizardItem
      color={conversionError ? 'error' : 'primary'}
      collapsible
      isExpanded={!!formFile || !!formUrl}
    >
      <span slot="prefix">2</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      <div className="space-y-5">
        <div className={`${conversionError ? 'block' : 'hidden'}`}>
          <GovInfobar color="error" type="subtle">
            <GovIcon name="exclamation-circle-fill" slot="icon" />
            <p className="text-lg">{conversionError ?? ''}</p>
          </GovInfobar>
        </div>
        <GovButton
          color="primary"
          size="l"
          type="solid"
          disabled={!formFile}
          onGovClick={handleConvert}
        >
          {t('Button')}
        </GovButton>
      </div>
    </GovWizardItem>
  );
};
