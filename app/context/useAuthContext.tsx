import React, { useReducer, useMemo } from "react";
import type { Nullable } from "~/api/schema/api";
import { createContext } from "~/libs/react-utils";

interface UserSchema extends Record<string, any> {}

enum Action {
  SET_LOGGED_IN = "SET_LOGGED_IN",
}

type SetLoggedInPayload = {
  isLoggedIn: boolean;
  currentProfile: Nullable<UserSchema>;
};

type SetLoggedInAction = {
  type: Action.SET_LOGGED_IN;
  payload: SetLoggedInPayload;
};

type ActionType = SetLoggedInAction;

interface AuthContextState {
  isLoggedIn: boolean;
  currentProfile: Nullable<UserSchema>;
}

interface AuthContext extends AuthContextState {
  setLoggedIn: (payload: SetLoggedInPayload) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: AuthContextState = {
  isLoggedIn: false,
  currentProfile: null,
};

const [Provider, useAuthContext] = createContext<AuthContext>({
  name: "useAuthContext",
  errorMessage: "useAuthContext: `context` is undefined.",
  defaultValue: initialState,
});

function reducer(state = initialState, action: ActionType): AuthContextState {
  switch (action.type) {
    case Action.SET_LOGGED_IN: {
      const { isLoggedIn, currentProfile } = action.payload;
      return {
        ...state,
        isLoggedIn,
        currentProfile,
      };
    }
    default:
      return state;
  }
}

interface Props extends Partial<AuthContextState> {
  children: React.ReactNode;
}

function AuthProvider({ children, ...otherProps }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    Object.assign({}, initialState, otherProps)
  );

  const setLoggedIn = (payload: SetLoggedInPayload) =>
    dispatch({ type: Action.SET_LOGGED_IN, payload });

  const actions = useMemo(
    () => ({
      ...state,
      setLoggedIn,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { AuthProvider, useAuthContext };
