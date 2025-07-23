import { useEffect, useState } from 'react';
import {
  GovButton,
  GovIcon,
  GovInfobar,
  GovWizardItem,
} from '@gov-design-system-ce/react';
import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';

import { ConversionResponseDto, useConvertFile } from '@/api/generated';
import { OUTPUT_FORMAT } from '@/lib/constants';
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
  const setValidationResults = useFormStore(
    (state) => state.setValidationResults,
  );

  const convertMutation = useConvertFile();

  const handleConvert = () => {
    if (!formFile) return;
    setConversionError(null);

    const formData = new FormData();
    formData.append('file', formFile);
    formData.append('output', OUTPUT_FORMAT);

    const removeInvalidSources =
      process.env.NEXT_PUBLIC_CONVERT_REMOVE_INVALID_SOURCES;
    if (removeInvalidSources === 'true') {
      formData.append('removeInvalidSources', 'true');
    }

    convertMutation.mutate(formData, {
      onError: (error) => {
        const axiosError = error as AxiosError<ConversionResponseDto>;
        const errorMessage =
          axiosError.response?.data?.errorMessage || t('ConversionUknownError');
        console.error('Error converting file:', errorMessage);
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
          setDownloadData(data.output);
          setValidationResults(data.validationResults || null);
        } else {
          console.error('Unexpected data format', data);
          setConversionError(t('ConversionUknownError'));
        }
      },
    });
  };

  useEffect(() => {
    // TODO: Extend this condition for URL and Dictionary list options
    if (formFile) {
      setConversionError(null);
    }
  }, [formFile]);

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
          loading={convertMutation.isPending.toString()}
        >
          {t('Button')}
        </GovButton>
      </div>
    </GovWizardItem>
  );
};
