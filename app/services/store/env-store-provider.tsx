import type { ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import type { EnvStore } from './env-store';
import { createEnvStore, initEnvStore } from './env-store';

export const EnvStoreContext = createContext<StoreApi<EnvStore> | null>(null);

export interface EnvStoreProviderProps
  extends Partial<Pick<EnvStore, 'apiHost' | 'layout'>> {
  children: ReactNode;
}

export const EnvStoreProvider = ({
  children,
  ...otherProps
}: EnvStoreProviderProps) => {
  const storeRef = useRef<StoreApi<EnvStore>>();
  if (!storeRef.current) {
    storeRef.current = createEnvStore(initEnvStore(otherProps));
  }

  return (
    <EnvStoreContext.Provider value={storeRef.current}>
      {children}
    </EnvStoreContext.Provider>
  );
};

export const useEnvStore = <T,>(selector: (store: EnvStore) => T): T => {
  const envStoreContext = useContext(EnvStoreContext);

  if (!envStoreContext) {
    throw new Error(`useCounterStore must be use within EnvStoreProvider`);
  }

  return useStore(envStoreContext, selector);
};
