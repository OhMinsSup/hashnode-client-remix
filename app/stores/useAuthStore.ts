import { useLayoutEffect } from "react";
import create, { type UseBoundStore, type StoreApi } from "zustand";
import createContext from "zustand/context";
import { isBrowser } from "~/libs/browser-utils";

import type { Nullable } from "~/api/schema/api";
import type { UserRespSchema } from "~/api/schema/resp";

interface AuthStore {
  isLoggedIn: boolean;
  currentProfile: Nullable<UserRespSchema>;
  setLoggedIn: (isLoggedIn: boolean) => void;
  setProfile: (profile: Nullable<UserRespSchema>) => void;
  setAuth: (isLoggedIn: boolean, profile: Nullable<UserRespSchema>) => void;
}

let store: UseBoundStore<StoreApi<AuthStore>>;

const getDefaultInitialState = () =>
  ({
    isLoggedIn: false,
    currentProfile: null,
  } as Omit<AuthStore, "setLoggedIn">);

const zustandContext = createContext();

export const AuthProvider = zustandContext.Provider;

export const useAuthStore = zustandContext.useStore as UseBoundStore<
  StoreApi<AuthStore>
>;

export const initializeAuthStore = (
  preloadedState = {} as Omit<
    AuthStore,
    "setLoggedIn" | "setProfile" | "setAuth"
  >
) => {
  return create<AuthStore>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    setProfile: (profile: Nullable<UserRespSchema>) =>
      set({ currentProfile: profile }),
    setAuth: (isLoggedIn: boolean, profile: Nullable<UserRespSchema>) =>
      set({ isLoggedIn, currentProfile: profile }),
  }));
};

export function useCreateAuthStore(
  serverInitialState: Omit<AuthStore, "setLoggedIn" | "setProfile" | "setAuth">
) {
  // Server side code: For SSR & SSG, always use a new store.
  if (!isBrowser) {
    return () => initializeAuthStore(serverInitialState);
  }
  // End of server side code

  // Client side code:
  // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store);
  store = store ?? initializeAuthStore(serverInitialState);
  // When next.js re-renders _app while re-using an older store, then replace current state with
  // the new state (in the next render cycle).
  // (Why next render cycle? Because react cannot re-render while a render is already in progress.
  // i.e. we cannot do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...(store?.getState() ?? {}),
          // but reset all other properties.
          ...serverInitialState,
        },
        true // replace states, rather than shallow merging
      );
    }
  });

  return () => store;
}
