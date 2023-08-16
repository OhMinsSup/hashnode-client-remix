import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";

enum Action {
  CHANGE_SCROLL_POSITION = "CHANGE_SCROLL_POSITION",
}

type ChangeScrollPositionAction = {
  type: Action.CHANGE_SCROLL_POSITION;
  payload: number;
};

type ActionType = ChangeScrollPositionAction;

interface AsideState {
  scrollPosition: number;
}

interface AsideContext extends AsideState {
  changeScrollPosition: (
    payload: ChangeScrollPositionAction["payload"]
  ) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: AsideState = {
  scrollPosition: 0,
};

const [Provider, useAsideContext] = createContext<AsideContext>({
  name: "useAsideContext",
  errorMessage: 'useAsideContext: "context" is undefined.',
  defaultValue: initialState,
});

interface Props {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case Action.CHANGE_SCROLL_POSITION:
      return {
        ...state,
        scrollPosition: action.payload,
      };
    default:
      return state;
  }
}

function AsideProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeScrollPosition = (
    payload: ChangeScrollPositionAction["payload"]
  ) => {
    dispatch({
      type: Action.CHANGE_SCROLL_POSITION,
      payload,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      changeScrollPosition,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { AsideProvider, useAsideContext };
