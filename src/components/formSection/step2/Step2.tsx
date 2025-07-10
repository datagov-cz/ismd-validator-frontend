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
import { useFormStore } from '@/store/formStore';

export const Step2 = () => {
  const t = useTranslations('Home.FormSection.Step2');

  const files = useFormStore((state) => state.files);
  const formUrl = useFormStore((state) => state.url);
  const fileError = useFormStore((state) => state.fileError);
  
  const formFile = files.length === 1 ? files[0] : undefined;

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
          setDownloadData(data);
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

  const hasError = !!conversionError || !!fileError;
  const isDisabled = !formFile || !!fileError;

  return (
    <GovWizardItem
      color={hasError ? 'error' : 'primary'}
      collapsible
      isExpanded={files.length > 0 || !!formUrl}
    >
      <span slot="prefix">2</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      <div className="space-y-5">
        <div className={`${hasError ? 'block' : 'hidden'}`}>
          <GovInfobar color="error" type="subtle">
            <GovIcon name="exclamation-circle-fill" slot="icon" />
            <p className="text-lg">
              {fileError || conversionError || t('ConversionUknownError')}
              {conversionError && (
                <>
                  {' '}
                  <a
                    href="https://github.com/datagov-cz/ismd-org/issues/new?template=bug_report.yml"
                    target="_blank"
                    className="underline"
                  >
                    {t('ConversionErrorLinkText')}
                  </a>
                </>
              )}
            </p>
          </GovInfobar>
        </div>
        <GovButton
          color="primary"
          size="l"
          type="solid"
          disabled={isDisabled}
          onGovClick={handleConvert}
          loading={convertMutation.isPending.toString()}
        >
          {t('Button')}
        </GovButton>
      </div>
    </GovWizardItem>
  );
};
