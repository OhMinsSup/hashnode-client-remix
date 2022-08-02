import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";

import { DEFAULT_SETTINGS, type SettingName } from "../_common/constants";

enum Action {
  SET_SETTINGS = "SET_SETTINGS",
}

export type SetSettingsAction = {
  type: Action.SET_SETTINGS;
};

type ActionType = SetSettingsAction;

interface SettingsState {
  settings: Record<SettingName, boolean>;
}

interface SettingsContext extends SettingsState {
  setOption: (name: SettingName, value: boolean) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: SettingsState = {
  settings: DEFAULT_SETTINGS,
};

const [Provider, useSettingsContext] = createContext<SettingsContext>({
  name: "useSettingsContext",
  errorMessage: "useSettingsContext: `context` is undefined.",
  defaultValue: initialState,
});

interface Props {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    default:
      return state;
  }
}

function SettingsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setOption = (setting: SettingName, value: boolean) => {};

  const actions = useMemo(
    () => ({
      ...state,
      dispatch,
      setOption,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { SettingsProvider, useSettingsContext };
