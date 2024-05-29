import { createStore } from 'zustand/vanilla';

export interface EnvState {
  apiHost: string | null;
}

export interface EnvAction {
  getApiHost: () => string;
  setApiHost: (apiHost: string) => void;
}

export type EnvStore = EnvState & EnvAction;

export const initEnvStore = (state?: Partial<EnvState>): EnvState => {
  return { apiHost: null, ...state };
};

export const defaultInitState: EnvState = {
  apiHost: null,
};

export const createEnvStore = (initState: EnvState = defaultInitState) => {
  return createStore<EnvStore>()((set) => ({
    ...initState,
    getApiHost: () => {
      const api = initState.apiHost;
      if (!api) {
        throw new Error('apiHost is not set');
      }
      return api;
    },
    setApiHost: (apiHost: string) => {
      set({ apiHost });
    },
  }));
};
