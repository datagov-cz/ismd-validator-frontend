import { useState } from 'react';
import {
  GovFormControl,
  GovFormGroup,
  GovFormInput,
  GovFormLabel,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { isValidUrl } from '@/lib/validationUtils';
import { useFormStore } from '@/store/formStore';

export const UrlForm = () => {
  const [error, setError] = useState<string>();

  const t = useTranslations('Home.FormSection.Step1');

  const setUrl = useFormStore((state) => state.setUrl);

  const handleSetUrl = (value: string) => {
    setError(undefined);

    if (value.trim() === '') {
      setUrl(undefined);
      return;
    }
    if (!isValidUrl(value)) {
      setError('Invalid URL');
      return;
    }
    setUrl(value);
  };

  return (
    <GovFormControl className="w-full">
      <GovFormLabel slot="top" size="m">
        Zadejte URL
      </GovFormLabel>
      <GovFormGroup>
        <GovFormInput
          placeholder="https://www.priklad.cz/data.ttl"
          inputType="url"
          size="m"
          onGovInput={(e) => handleSetUrl(e.detail.value)}
          invalid={!!error}
        />
      </GovFormGroup>
      <div className={`text-error mt-1 pl-5 ${error ? 'block' : 'hidden'}`}>
        {t('UrlForm.UrlError')}
      </div>
    </GovFormControl>
  );
};
