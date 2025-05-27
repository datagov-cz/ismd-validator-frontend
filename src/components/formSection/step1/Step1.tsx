import { useState } from 'react';
import {
  GovFormLabel,
  GovFormRadio,
  GovFormRadioGroup,
  GovWizardItem,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { FileForm } from './FileForm';
import { SearchForm } from './SearchForm';
import { UrlForm } from './UrlForm';

type OptionType = 'file' | 'url' | 'dict';

export const Step1 = () => {
  const t = useTranslations('Home.FormSection.Step1');
  const [selectedOption, setSelectedOption] = useState<OptionType>('file');

  return (
    <GovWizardItem color="primary" collapsible isExpanded>
      <span slot="prefix">1</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      <div className="text-dark-primary max-w-[808px]">
        <GovFormRadioGroup
          value={selectedOption}
          onGovChange={(val) =>
            setSelectedOption(val.detail.value as OptionType)
          }
        >
          <GovFormRadio value="file">
            <GovFormLabel slot="label">{t('FileForm.Label')}</GovFormLabel>
          </GovFormRadio>
          {selectedOption === 'file' && <FileForm />}
          <GovFormRadio value="url">
            <GovFormLabel slot="label">{t('UrlForm.Label')}</GovFormLabel>
          </GovFormRadio>
          {selectedOption === 'url' && <UrlForm />}
          <GovFormRadio value="dict">
            <GovFormLabel slot="label">{t('DictForm.Label')}</GovFormLabel>
          </GovFormRadio>
          {selectedOption === 'dict' && <SearchForm />}
        </GovFormRadioGroup>
      </div>
    </GovWizardItem>
  );
};
