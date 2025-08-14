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

type SSPDictionaryStoreType = {
  dictionaries: DictionaryResponse[];
};

type SSPDictionaryStoreActions = {
  setDictionaries: (dictionaries: DictionaryResponse[]) => void;
};

const initialState: SSPDictionaryStoreType = {
  dictionaries: [],
};

export const useSSPDictionariesStore = create<
  SSPDictionaryStoreType & SSPDictionaryStoreActions
>((set) => ({
  ...initialState,
  setDictionaries: (dictionaries) => set({ dictionaries }),
}));
