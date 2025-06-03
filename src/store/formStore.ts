import { create } from 'zustand';

import { DictProcessInfoStatusType } from '@/lib/appTypes';

type FormStoreType = {
  file?: File;
  url?: string;
  status?: DictProcessInfoStatusType;
};

type FormStoreActions = {
  setFile: (file?: File) => void;
  setUrl: (url?: string) => void;
  setStatus: (status?: DictProcessInfoStatusType) => void;
  reset: () => void;
};

const initialState: FormStoreType = {
  file: undefined,
  url: undefined,
};

export const useFormStore = create<FormStoreType & FormStoreActions>((set) => ({
  ...initialState,
  setFile: (file) => set({ file }),
  setUrl: (url) => set({ url }),
  setStatus: (status) => set({ status }),
  reset: () => set({ ...initialState }),
}));
