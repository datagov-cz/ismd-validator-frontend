import { create } from 'zustand';

import { ConversionResponseDto } from '@/api/generated';
import { ConversionType, StatusType } from '@/lib/appTypes';

type FormStoreType = {
  files: File[];
  url?: string;
  fileError?: string;
  dictionaryStatus: StatusType | null;
  conversionResponse: ConversionResponseDto | null;
  sspDictionaryIri: string | null;
  typeOfConversion: ConversionType;
};

type FormStoreActions = {
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
  setUrl: (url?: string) => void;
  setConversionResponse: (response: ConversionResponseDto) => void;
  setDictionaryStatus: (status: StatusType | null) => void;
  setFileError: (error?: string) => void;
  setSspDictionaryIri: (iri: string) => void;
  setTypeOfConversion: (type: ConversionType) => void;
  reset: () => void;
};

const initialState: FormStoreType = {
  files: [],
  url: undefined,
  dictionaryStatus: null,
  conversionResponse: null,
  sspDictionaryIri: null,
  typeOfConversion: 'file',
};

export const useFormStore = create<FormStoreType & FormStoreActions>((set) => ({
  ...initialState,
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (file) =>
    set((state) => ({ files: state.files.filter((f) => f !== file) })),
  setUrl: (url) => set({ url }),
  setConversionResponse: (data) => set({ conversionResponse: data }),
  setDictionaryStatus: (dictionaryStatus) => set({ dictionaryStatus }),
  setFileError: (error) => set({ fileError: error }),
  setSspDictionaryIri: (iri) => set({ sspDictionaryIri: iri }),
  setTypeOfConversion: (type) => set({ typeOfConversion: type }),
  reset: () => set({ ...initialState }),
}));
