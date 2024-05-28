import { create } from 'zustand';

interface EnvState {
  apiHost: string | null;
  getApiHost: () => string;
  setApiHost: (apiHost: string) => void;
}

export const useEnvStore = create<EnvState>()((set, get) => ({
  apiHost: null,
  getApiHost: () => {
    const api = get().apiHost;
    if (!api) {
      throw new Error('apiHost is not set');
    }
    return api;
  },
  setApiHost: (apiHost: string) => {
    set({ apiHost });
  },
}));
