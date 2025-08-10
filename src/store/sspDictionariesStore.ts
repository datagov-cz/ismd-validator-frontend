import { create } from 'zustand';

type SparqlBindingValue = {
  type: 'uri' | 'literal' | string;
  value: string;
  'xml:lang'?: string;
};

export type SparqlBinding = Record<string, SparqlBindingValue>;

export type SparqlResponse = {
  head: {
    link: string[];
    vars: string[];
  };
  results: {
    distinct: boolean;
    ordered: boolean;
    bindings: SparqlBinding[];
  };
};

type DictionaryResponse = {
  slovnik: SparqlBindingValue;
  nazev_slovniku: SparqlBindingValue;
};

type Dictionary = {
  uri: string;
  nazev_slovniku: string;
};

type SSPDictionaryStoreType = {
  dictionaries: DictionaryResponse[];
  selectedDictionary: Dictionary | null;
};

type SSPDictionaryStoreActions = {
  setDictionaries: (dictionaries: DictionaryResponse[]) => void;
  setSelectedDictionary: (dictionary: Dictionary) => void;
};

const initialState: SSPDictionaryStoreType = {
  dictionaries: [],
  selectedDictionary: null,
};

export const useSSPDictionariesStore = create<
  SSPDictionaryStoreType & SSPDictionaryStoreActions
>((set) => ({
  ...initialState,
  setDictionaries: (dictionaries) => set({ dictionaries }),
  setSelectedDictionary: (selectedDictionary) => set({ selectedDictionary }),
}));
