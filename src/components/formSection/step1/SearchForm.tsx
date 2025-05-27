import {
  GovButton,
  GovFormControl,
  GovFormGroup,
  GovFormInput,
  GovFormSearch,
  GovIcon,
} from '@gov-design-system-ce/react';

export const SearchForm = () => {
  return (
    <GovFormControl className="w-full">
      <GovFormGroup>
        <GovFormSearch>
          <GovFormInput
            slot="input"
            placeholder="Vyberte slovník z Výrobní linky..."
          />
          <GovButton slot="button">
            <GovIcon name="search" slot="icon-start" />
          </GovButton>
        </GovFormSearch>
      </GovFormGroup>
    </GovFormControl>
  );
};
