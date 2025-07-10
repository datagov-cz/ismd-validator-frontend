import { create } from 'zustand';

import { ConversionResponseDto } from '@/api/generated';
import { StatusType } from '@/lib/appTypes';

type FormStoreType = {
  files: File[];
  url?: string;
  fileError?: string;
  dictionaryStatus: StatusType | null;
  downloadData: ConversionResponseDto | null;
};

type FormStoreActions = {
  setFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
  setUrl: (url?: string) => void;
  setFileError: (error?: string) => void;
  setDictionaryStatus: (status: StatusType | null) => void;
  setDownloadData: (data: object | null) => void;
  reset: () => void;
};

const initialState: FormStoreType = {
  files: [],
  url: undefined,
  fileError: undefined,
  downloadData: null,
  dictionaryStatus: null,
};

export const useFormStore = create<FormStoreType & FormStoreActions>((set) => ({
  ...initialState,
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (file) =>
    set((state) => ({ files: state.files.filter((f) => f !== file) })),
  setUrl: (url) => set({ url }),
  setFileError: (fileError) => set({ fileError }),
  setDictionaryStatus: (dictionaryStatus) => set({ dictionaryStatus }),
  setDownloadData: (data) => set({ downloadData: data }),
  reset: () => set({ ...initialState }),
}));
