import { useEffect, useState } from 'react';
import { GovButton, GovWizardItem } from '@gov-design-system-ce/react';
import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';

import {
  ConversionResponseDto,
  useConvertFile,
  useConvertSSPFromIRI,
} from '@/api/generated';
import { OUTPUT_FORMAT } from '@/lib/constants';
import { getFileNameFromUrl } from '@/lib/downloadUtils';
import { useFormStore } from '@/store/formStore';

import { ErrorInfobar } from './ErrorInfobar';
import { WarningInfobar } from './WarningInfobar';

export const Step2 = () => {
  const t = useTranslations('Home.FormSection.Step2');

  const files = useFormStore((state) => state.files);
  const formUrl = useFormStore((state) => state.url);
  const sspDictionary = useFormStore((state) => state.sspDictionary);
  const fileError = useFormStore((state) => state.fileError);
  const urlError = useFormStore((state) => state.urlError);
  const typeOfConversion = useFormStore((state) => state.typeOfConversion);
  const dictionaryStatus = useFormStore((state) => state.dictionaryStatus);

  const formFile = files.length === 1 ? files[0] : undefined;

  const [conversionError, setConversionError] = useState<string>();

  const setDictionaryStatus = useFormStore(
    (state) => state.setDictionaryStatus,
  );
  const setConversionResponse = useFormStore(
    (state) => state.setConversionResponse,
  );
  const setDictionaryName = useFormStore((state) => state.setDictionaryName);

  const showWarningBar = useFormStore((state) => state.showWarningBar);
  const setShowWarningBar = useFormStore((state) => state.setShowWarningBar);

  const convertFileMutation = useConvertFile();
  const convertSspDictMutation = useConvertSSPFromIRI();

  const convertMutation =
    typeOfConversion === 'dict' ? convertSspDictMutation : convertFileMutation;

  const handleConvert = () => {
    setShowWarningBar(false);
    setConversionError(undefined);

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
        setDictionaryName(formFile.name.split('.')[0]);
        break;
      case 'url':
        if (!formUrl) {
          return;
        }
        formData.append('fileUrl', formUrl);
        setDictionaryName(getFileNameFromUrl(formUrl));
        break;
      case 'dict':
        if (!sspDictionary) {
          return;
        }
        formData.append('iri', sspDictionary.iri);
        setDictionaryName(sspDictionary.label);
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
      setConversionError(undefined);
      if (dictionaryStatus) {
        setShowWarningBar(true);
      }
    }
  }, [formUrl, formFile, sspDictionary, dictionaryStatus]);

  const hasError = !!conversionError || !!fileError;

  const isDisabled =
    (!formUrl && (!formFile || !!fileError) && !sspDictionary) ||
    convertMutation.isPending;

  return (
    <GovWizardItem
      color={hasError ? 'error' : 'primary'}
      collapsible
      isExpanded={
        files.length > 0 || (!!formUrl && !urlError) || !!sspDictionary
      }
    >
      <span slot="prefix">2</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation" className="text-left">
        {t('Annotation')}
      </span>
      <div className="space-y-5">
        <ErrorInfobar
          isHidden={!hasError}
          fileError={fileError}
          conversionError={conversionError}
        />
        <WarningInfobar isHidden={!showWarningBar} />
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
