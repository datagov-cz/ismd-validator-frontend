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
  const urlError = useFormStore((state) => state.urlError);

  const setUrlError = useFormStore((state) => state.setUrlError);

  const t = useTranslations('Home.FormSection.Step1');

  const setUrl = useFormStore((state) => state.setUrl);

  const handleSetUrl = (value: string) => {
    setUrlError(undefined);

    if (value.trim() === '') {
      setUrl(undefined);
      return;
    }
    if (!isValidUrl(value)) {
      setUrlError(t('UrlForm.UrlError'));
      return;
    }
    setUrl(value);
  };

  return (
    <GovFormControl
      className="w-full"
      top={
        <GovFormLabel size="xl" legend>
          Zadejte URL
        </GovFormLabel>
      }
    >
      <GovFormGroup>
        <GovFormInput
          id="url-input"
          placeholder="https://www.priklad.cz/data.ttl"
          type="url"
          size="m"
          onInput={(e) => handleSetUrl(e.currentTarget.value)}
          invalid={!!urlError}
        />
      </GovFormGroup>
      <div
        className={`text-error text-sm pt-1 pl-5 ${urlError ? 'block' : 'hidden'}`}
      >
        {urlError}
      </div>
    </GovFormControl>
  );
};
