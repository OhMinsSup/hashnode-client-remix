import { createStore } from 'zustand/vanilla';

export interface EnvState {
  apiHost: string | null;
  layout: number;
}

export interface EnvAction {
  getApiHost: () => string;
  setApiHost: (apiHost: string) => void;
  setLayout: (layout: number) => void;
  getLayout: () => number;
}

export type EnvStore = EnvState & EnvAction;

export const initEnvStore = (state?: Partial<EnvState>): EnvState => {
  return { apiHost: null, layout: 0, ...state };
};

export const defaultInitState: EnvState = {
  layout: 0,
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
    setLayout: (layout: number) => {
      set({ layout });
    },
    getLayout: () => initState.layout,
  }));
};
