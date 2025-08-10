import { useFormStore } from '@/store/formStore';
import { useSSPDictionariesStore } from '@/store/sspDictionariesStore';
import { GovFormControl, GovFormGroup } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';
import Select from 'react-select';

export const SearchForm = () => {
  const t = useTranslations('Home.FormSection.Step1');

  const sspDictionaries = useSSPDictionariesStore(
    (state) => state.dictionaries,
  );

  const setSspDictionaryIri = useFormStore(
    (state) => state.setSspDictionaryIri,
  );

  const dictionariesMapped = sspDictionaries.map((dictionary) => ({
    value: dictionary.slovnik.value,
    label: dictionary.nazev_slovniku.value,
  }));

  return (
    <GovFormControl className="w-full">
      <GovFormGroup>
        <Select
          className="h-10 w-full rounded-lg"
          options={dictionariesMapped}
          placeholder={t('DictForm.SelectDictPlaceholder')}
          onChange={(option) => setSspDictionaryIri(option?.value ?? '')}
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
