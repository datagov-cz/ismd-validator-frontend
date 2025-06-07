import { create } from 'zustand';

import { StatusType } from '@/lib/appTypes';

type FormStoreType = {
  file?: File;
  url?: string;
  dictionaryStatus?: StatusType;
  downloadData: object | null;
};

type FormStoreActions = {
  setFile: (file?: File) => void;
  setUrl: (url?: string) => void;
  setDictionaryStatus: (status: StatusType) => void;
  setDownloadData: (data: object | null) => void;
  reset: () => void;
};

const initialState: FormStoreType = {
  file: undefined,
  url: undefined,
  downloadData: null,
};

export const useFormStore = create<FormStoreType & FormStoreActions>((set) => ({
  ...initialState,
  setFile: (file) => set({ file }),
  setUrl: (url) => set({ url }),
  setDictionaryStatus: (dictionaryStatus) => set({ dictionaryStatus }),
  setDownloadData: (data) => set({ downloadData: data }),
  reset: () => set({ ...initialState }),
}));
