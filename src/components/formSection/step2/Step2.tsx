import { useEffect, useState } from 'react';
import {
  GovButton,
  GovIcon,
  GovInfobar,
  GovWizardItem,
} from '@gov-design-system-ce/react';
import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';

import {
  ConversionResponseDto,
  useConvertFile,
  useConvertSSPFromIRI,
} from '@/api/generated';
import { OUTPUT_FORMAT } from '@/lib/constants';
import { useFormStore } from '@/store/formStore';

export const Step2 = () => {
  const t = useTranslations('Home.FormSection.Step2');

  const files = useFormStore((state) => state.files);
  const formUrl = useFormStore((state) => state.url);
  const sspDictionary = useFormStore((state) => state.sspDictionary);
  const fileError = useFormStore((state) => state.fileError);
  const typeOfConversion = useFormStore((state) => state.typeOfConversion);

  const formFile = files.length === 1 ? files[0] : undefined;

  const [conversionError, setConversionError] = useState<string | null>(null);

  const setDictionaryStatus = useFormStore(
    (state) => state.setDictionaryStatus,
  );
  const setConversionResponse = useFormStore(
    (state) => state.setConversionResponse,
  );

  const convertFileMutation = useConvertFile();
  const convertSspDictMutation = useConvertSSPFromIRI();

  const convertMutation =
    typeOfConversion === 'dict' ? convertSspDictMutation : convertFileMutation;

  const handleConvert = () => {
    setConversionError(null);

    const formData = new FormData();

    formData.append('output', OUTPUT_FORMAT);

    const includeCatalogRecord = process.env.NEXT_PUBLIC_INCLUDE_CATALOG_REPORT;
    if (includeCatalogRecord === 'true') {
      formData.append('includeCatalogRecord', 'true');
    }

    const includeDetailedReport =
      process.env.NEXT_PUBLIC_INCLUDE_DETAILED_REPORT;
    if (includeDetailedReport === 'true') {
      formData.append('includeDetailedReport', 'true');
    }

    switch (typeOfConversion) {
      case 'file':
        if (!formFile) {
          return;
        }
        formData.append('file', formFile);
        break;
      case 'url':
        if (!formUrl) {
          return;
        }
        formData.append('fileUrl', formUrl);
        break;
      case 'dict':
        if (!sspDictionary) {
          return;
        }
        formData.append('iri', sspDictionary.iri);
        break;
    }

    convertMutation.mutate(formData, {
      onError: (error) => {
        const axiosError = error as AxiosError<ConversionResponseDto>;
        const errorMessage =
          axiosError.response?.data?.errorMessage || t('ConversionUknownError');
        console.error('Error converting file:', errorMessage);
        setConversionError(errorMessage);
        setDictionaryStatus({
          status: 'Error',
          message: errorMessage,
        });
      },
      onSuccess: (data) => {
        if (typeof data === 'object' && data !== null) {
          const allValidationsInformative =
            data.validationResults?.severityGroups?.find(
              (group) => group.severity?.toLowerCase() !== 'informace',
            );

          setDictionaryStatus({
            status: allValidationsInformative ? 'Warning' : 'Success',
            message: 'File converted successfully',
          });
          setConversionResponse(data);
        } else {
          console.error('Unexpected data format', data);
          setConversionError(t('ConversionUknownError'));
        }
      },
    });
  };

  useEffect(() => {
    if (formUrl || formFile || sspDictionary) {
      setConversionError(null);
    }
  }, [formUrl, formFile, sspDictionary]);

  const hasError = !!conversionError || !!fileError;
  const isDisabled = !formUrl && (!formFile || !!fileError) && !sspDictionary;

  return (
    <GovWizardItem
      color={hasError ? 'error' : 'primary'}
      collapsible
      isExpanded={files.length > 0 || !!formUrl || !!sspDictionary}
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
