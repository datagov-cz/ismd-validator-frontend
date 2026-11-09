import { useEffect, useRef, useState } from 'react';
import { GovButton, GovWizardItem } from '@gov-design-system-ce/react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';

import {
  ApiResponseDtoConversionResponseDto,
  ConformanceIssueDto,
  ConversionResponseDto,
} from '@/api/generated';
import { axiosInstance } from '@/axios-instance';
import { OUTPUT_FORMAT } from '@/lib/constants';
import {
  getErrorBodyMessage,
  getOfnConformanceFailure,
  getReportWithErrors,
} from '@/lib/conversionErrors';
import { getFileNameFromUrl } from '@/lib/downloadUtils';
import { useFormStore } from '@/store/formStore';

import { ErrorInfobar } from './ErrorInfobar';
import { WarningInfobar } from './WarningInfobar';

type ConversionApiError = AxiosError<ApiResponseDtoConversionResponseDto>;
type ConversionRequest = {
  endpoint: '/api/converter/convert' | '/api/converter/ssp/convert';
  formData: FormData;
};

const getOntologyName = (data: ConversionResponseDto) => {
  const names = data.validationReport?.ontology?.name;
  return names?.cs || names?.en || Object.values(names ?? {}).find(Boolean);
};

export const Step2 = () => {
  const t = useTranslations('Home.FormSection.Step2');

  const files = useFormStore((state) => state.files);
  const formUrl = useFormStore((state) => state.url);
  const sspDictionary = useFormStore((state) => state.sspDictionary);
  const fileError = useFormStore((state) => state.fileError);
  const urlError = useFormStore((state) => state.urlError);
  const typeOfConversion = useFormStore((state) => state.typeOfConversion);

  const formFile = files.length === 1 ? files[0] : undefined;

  const [conversionError, setConversionError] = useState<string>();
  const [conformanceFailureIssues, setConformanceFailureIssues] =
    useState<ConformanceIssueDto[]>();
  const hasValidatedRef = useRef(false);

  const setDictionaryStatus = useFormStore(
    (state) => state.setDictionaryStatus,
  );
  const setConversionResponse = useFormStore(
    (state) => state.setConversionResponse,
  );
  const setDictionaryName = useFormStore((state) => state.setDictionaryName);

  const showWarningBar = useFormStore((state) => state.showWarningBar);
  const setShowWarningBar = useFormStore((state) => state.setShowWarningBar);

  const convertMutation = useMutation<
    ApiResponseDtoConversionResponseDto,
    ConversionApiError,
    ConversionRequest
  >({
    mutationFn: ({ endpoint, formData }) =>
      axiosInstance<ApiResponseDtoConversionResponseDto>({
        url: endpoint,
        method: 'POST',
        data: formData,
      }),
  });

  const handleConvert = () => {
    setShowWarningBar(false);
    setConversionError(undefined);
    setConformanceFailureIssues(undefined);

    const includeDetailedReport =
      process.env.NEXT_PUBLIC_INCLUDE_DETAILED_REPORT === 'true';

    const onError = (error: ConversionApiError) => {
      // Converted, but the report has errors: show the report, without a dictionary to download.
      const reportWithErrors = getReportWithErrors(error);
      if (reportWithErrors) {
        const ontologyName = getOntologyName(reportWithErrors.data);
        if (ontologyName) {
          setDictionaryName(ontologyName);
        }
        setConversionResponse(reportWithErrors.data);
        setDictionaryStatus({
          status: 'Error',
          message: reportWithErrors.message,
        });
        hasValidatedRef.current = true;
        return;
      }

      const errorMessage =
        getErrorBodyMessage(error) || t('ConversionUknownError');
      console.error('Error converting file:', errorMessage);
      setConversionResponse(null);
      setConversionError(errorMessage);
      setConformanceFailureIssues(getOfnConformanceFailure(error)?.issues);
      setDictionaryStatus({
        status: 'Error',
        message: errorMessage,
      });
    };

    const onSuccess = (response: ApiResponseDtoConversionResponseDto) => {
      const data = response.data;

      if (data) {
        const allValidationsInformative =
          data.validationResults?.severityGroups?.find(
            (group) => group.severity?.toLowerCase() !== 'informace',
          );
        const ontologyName = getOntologyName(data);

        if (ontologyName) {
          setDictionaryName(ontologyName);
        }

        setDictionaryStatus({
          status: allValidationsInformative ? 'Warning' : 'Success',
          message: response.message || 'File converted successfully',
        });
        setConversionResponse(data);
        hasValidatedRef.current = true;
      } else {
        const errorMessage = response.message || t('ConversionUknownError');
        console.error('Unexpected conversion response', response);
        setConversionError(errorMessage);
        setDictionaryStatus({ status: 'Error', message: errorMessage });
      }
    };

    const commonParams = {
      output: OUTPUT_FORMAT,
      includeDetailedReport,
    };

    const formData = new FormData();
    formData.append('output', commonParams.output);
    if (commonParams.includeDetailedReport) {
      formData.append('includeDetailedReport', 'true');
    }

    switch (typeOfConversion) {
      case 'file':
        if (!formFile) return;
        setDictionaryName(formFile.name.split('.')[0]);
        formData.append('file', formFile);
        convertMutation.mutate(
          { endpoint: '/api/converter/convert', formData },
          { onError, onSuccess },
        );
        break;
      case 'url':
        if (!formUrl) return;
        setDictionaryName(getFileNameFromUrl(formUrl));
        formData.append('fileUrl', formUrl);
        convertMutation.mutate(
          { endpoint: '/api/converter/convert', formData },
          { onError, onSuccess },
        );
        break;
      case 'dict':
        if (!sspDictionary) return;
        setDictionaryName(sspDictionary.label);
        formData.append('iri', sspDictionary.iri);
        convertMutation.mutate(
          { endpoint: '/api/converter/ssp/convert', formData },
          { onError, onSuccess },
        );
        break;
    }
  };

  useEffect(() => {
    if (formUrl || formFile || sspDictionary) {
      setConversionError(undefined);
      setConformanceFailureIssues(undefined);
      if (hasValidatedRef.current) {
        setShowWarningBar(true);
      }
    }
  }, [formUrl, formFile, sspDictionary, setConversionError, setShowWarningBar]);

  const hasError = !!conversionError || !!fileError;

  const isDisabled =
    (!formUrl && (!formFile || !!fileError) && !sspDictionary) ||
    convertMutation.isPending;

  return (
    <GovWizardItem
      color={hasError ? 'error' : 'primary'}
      collapsible
      prefix="2"
      headline={<span>{t('Headline')}</span>}
      annotation={<span className="text-left">{t('Annotation')}</span>}
      isExpanded={
        files.length > 0 || (!!formUrl && !urlError) || !!sspDictionary
      }
    >
      <div className="space-y-5">
        <ErrorInfobar
          isHidden={!hasError}
          fileError={fileError}
          conversionError={conversionError}
          issues={conformanceFailureIssues}
        />
        <WarningInfobar isHidden={!showWarningBar} />
        <GovButton
          color="primary"
          size="l"
          type="solid"
          disabled={isDisabled}
          onClick={handleConvert}
          loading={convertMutation.isPending.toString()}
        >
          {t('Button')}
        </GovButton>
      </div>
    </GovWizardItem>
  );
};
