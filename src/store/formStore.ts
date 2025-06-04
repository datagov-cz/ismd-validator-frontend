import { create } from 'zustand';

import { DictProcessInfoStatusType } from '@/lib/appTypes';

type FormStoreType = {
  file?: File;
  url?: string;
  status?: DictProcessInfoStatusType;
  downloadData: object | null;
};

type FormStoreActions = {
  setFile: (file?: File) => void;
  setUrl: (url?: string) => void;
  setStatus: (status?: DictProcessInfoStatusType) => void;
  setDownloadData: (data: object | null) => void;
  reset: () => void;
};

const initialState: FormStoreType = {
  file: undefined,
  url: undefined,
  status: undefined,
  downloadData: null,
};

export const useFormStore = create<FormStoreType & FormStoreActions>((set) => ({
  ...initialState,
  setFile: (file) => set({ file }),
  setUrl: (url) => set({ url }),
  setStatus: (status) => set({ status }),
  setDownloadData: (data) => set({ downloadData: data }),
  reset: () => set({ ...initialState }),
}));
