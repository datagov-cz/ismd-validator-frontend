import {
  GovFormLabel,
  GovFormRadio,
  GovFormRadioGroup,
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
    <GovWizardItem color="primary" collapsible isExpanded>
      <span slot="prefix">1</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      <div className="text-dark-primary max-w-[808px] transition-colors duration-300">
        <GovFormRadioGroup
          value={typeOfConversion}
          onGovChange={(val) => {
            setTypeOfConversion(val.detail.value as ConversionType);
            resetForms();
          }}
        >
          <div className="w-full">
            <GovFormRadio value="file">
              <GovFormLabel slot="label">{t('FileForm.Label')}</GovFormLabel>
            </GovFormRadio>
            {typeOfConversion === 'file' && <FileForm />}
          </div>
          <div className="w-full">
            <GovFormRadio value="url">
              <GovFormLabel slot="label">{t('UrlForm.Label')}</GovFormLabel>
            </GovFormRadio>
            {typeOfConversion === 'url' && <UrlForm />}
          </div>
          <div className="w-full">
            <GovFormRadio value="dict">
              <GovFormLabel slot="label">{t('DictForm.Label')}</GovFormLabel>
            </GovFormRadio>
            {typeOfConversion === 'dict' && <SearchForm />}
          </div>
        </GovFormRadioGroup>
      </div>
    </GovWizardItem>
  );
};
