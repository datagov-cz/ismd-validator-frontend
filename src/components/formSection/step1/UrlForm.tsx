import {
  GovFormControl,
  GovFormGroup,
  GovFormInput,
  GovFormLabel,
} from '@gov-design-system-ce/react';

export const UrlForm = () => {
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
        />
      </GovFormGroup>
    </GovFormControl>
  );
};
