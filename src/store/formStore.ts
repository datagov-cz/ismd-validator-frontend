import { create } from 'zustand';

type FormStoreType = {
  file?: File;
  url?: string;
};

type FormStoreActions = {
  setFile: (file?: File) => void;
  setUrl: (url?: string) => void;
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
  reset: () => set({ ...initialState }),
}));
