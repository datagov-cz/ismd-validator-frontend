import {
  GovFormGroup,
  GovFormLabel,
  GovFormRadio,
  GovWizardItem,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { ConversionType } from '@/lib/appTypes';
import { useFormStore } from '@/store/formStore';

import { FileForm } from './FileForm';
import { SearchForm } from './SearchForm';
import { UrlForm } from './UrlForm';

export const Step1 = () => {
  const t = useTranslations('Home.FormSection.Step1');

  const typeOfConversion = useFormStore((state) => state.typeOfConversion);

  const setTypeOfConversion = useFormStore(
    (state) => state.setTypeOfConversion,
  );
  const resetForms = useFormStore((state) => state.resetForms);

  return (
    <GovWizardItem
      color="primary"
      collapsible
      isExpanded
      prefix="1"
      headline={<span>{t('Headline')}</span>}
      annotation={<span className="text-left">{t('Annotation')}</span>}
    >
      <div className="text-dark-primary max-w-[808px] transition-colors duration-300">
        <GovFormGroup orientation="vertical">
          <div className="w-full">
            <GovFormRadio
              name="conversion-type"
              value="file"
              checked={typeOfConversion === 'file'}
              onChange={() => {
                setTypeOfConversion('file' as ConversionType);
                resetForms();
              }}
            >
              <GovFormLabel>{t('FileForm.Label')}</GovFormLabel>
            </GovFormRadio>
            {typeOfConversion === 'file' && <FileForm />}
          </div>
          <div className="w-full">
            <GovFormRadio
              name="conversion-type"
              value="url"
              checked={typeOfConversion === 'url'}
              onChange={() => {
                setTypeOfConversion('url' as ConversionType);
                resetForms();
              }}
            >
              <GovFormLabel>{t('UrlForm.Label')}</GovFormLabel>
            </GovFormRadio>
            {typeOfConversion === 'url' && <UrlForm />}
          </div>
          <div className="w-full">
            <GovFormRadio
              name="conversion-type"
              value="dict"
              checked={typeOfConversion === 'dict'}
              onChange={() => {
                setTypeOfConversion('dict' as ConversionType);
                resetForms();
              }}
            >
              <GovFormLabel>{t('DictForm.Label')}</GovFormLabel>
            </GovFormRadio>
            {typeOfConversion === 'dict' && <SearchForm />}
          </div>
        </GovFormGroup>
      </div>
    </GovWizardItem>
  );
};
