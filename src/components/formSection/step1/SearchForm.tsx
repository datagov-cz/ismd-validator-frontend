import { useSSPDictionariesStore } from '@/store/sspDictionariesStore';
import { GovFormControl, GovFormGroup } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';
import Select, { SingleValue } from 'react-select';

export const SearchForm = () => {
  const t = useTranslations('Home.FormSection.Step1');

  const sspDictionaries = useSSPDictionariesStore(
    (state) => state.dictionaries,
  );
  const setSelectedDictionary = useSSPDictionariesStore(
    (state) => state.setSelectedDictionary,
  );

  const dictionariesMapped = sspDictionaries.map((dictionary) => ({
    value: dictionary.slovnik.value,
    label: dictionary.nazev_slovniku.value,
  }));

  const handleSelectSSPDict = (
    option: SingleValue<{ value: string; label: string }>,
  ) => {
    setSelectedDictionary({
      uri: option?.value ?? '',
      nazev_slovniku: option?.label ?? '',
    });
  };

  return (
    <GovFormControl className="w-full">
      <GovFormGroup>
        <Select
          className="h-10 w-full rounded-lg"
          options={dictionariesMapped}
          placeholder={t('DictForm.SelectDictPlaceholder')}
          onChange={handleSelectSSPDict}
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '8px',
              paddingRight: '10px',
              height: '40px',
              border: '1px solid #b0b0b0',
              cursor: 'text',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor:
                state.isSelected || state.isFocused ? '#e2e2e2' : 'white',
              color: 'black',
              cursor: 'pointer',
            }),
          }}
        />
      </GovFormGroup>
    </GovFormControl>
  );
};
