import { create } from 'zustand';

import { ConversionResponseDto } from '@/api/generated';
import { StatusType } from '@/lib/appTypes';

type FormStoreType = {
  files: File[];
  url?: string;
  fileError?: string;
  dictionaryStatus: StatusType | null;
  conversionResponse: ConversionResponseDto | null;
};

type FormStoreActions = {
  setFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
  setUrl: (url?: string) => void;
  setConversionResponse: (response: ConversionResponseDto) => void;
  setDictionaryStatus: (status: StatusType | null) => void;
  setFileError: (error?: string) => void;
  reset: () => void;
};

const initialState: FormStoreType = {
  files: [],
  url: undefined,
  dictionaryStatus: null,
  conversionResponse: null,
};

export const useFormStore = create<FormStoreType & FormStoreActions>((set) => ({
  ...initialState,
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (file) =>
    set((state) => ({ files: state.files.filter((f) => f !== file) })),
  setUrl: (url) => set({ url }),
  setConversionResponse: (data) => set({ conversionResponse: data }),
  setDictionaryStatus: (dictionaryStatus) => set({ dictionaryStatus }),
  setFileError: (error) => set({ fileError: error }),
  reset: () => set({ ...initialState }),
}));
