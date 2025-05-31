import {
  GovFormControl,
  GovFormGroup,
  GovFormInput,
  GovFormLabel,
} from '@gov-design-system-ce/react';

import { useFormStore } from '@/store/formStore';

export const UrlForm = () => {
  const setUrl = useFormStore((state) => state.setUrl);

  const handleSetUrl = (value: string) => {
    if (value.trim() === '') {
      setUrl(undefined);
      return;
    }
    if (!value.startsWith('http')) {
      setUrl(undefined);
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
        />
      </GovFormGroup>
    </GovFormControl>
  );
};
