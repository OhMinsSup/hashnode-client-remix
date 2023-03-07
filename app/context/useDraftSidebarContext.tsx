import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";

enum Action {
  CHANGE_KEYWORD = "CHANGE_KEYWORD",
}

type ChangeKeywordAction = {
  type: Action.CHANGE_KEYWORD;
  payload: string;
};

type ActionType = ChangeKeywordAction;

interface DraftSidebarState {
  keyword: string;
}

interface DraftSidebarContext extends DraftSidebarState {
  changeKeyword: (keyword: string) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: DraftSidebarState = {
  keyword: "",
};

const [Provider, useDraftSidebarContext] = createContext<DraftSidebarContext>({
  name: "useDraftSidebarContext",
  errorMessage: 'useDraftSidebarContext: "context" is undefined.',
  defaultValue: initialState,
});

interface Props {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case Action.CHANGE_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
}

function DraftSidebarProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeKeyword = (keyword: string) => {
    dispatch({
      type: Action.CHANGE_KEYWORD,
      payload: keyword,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      changeKeyword,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { DraftSidebarProvider, useDraftSidebarContext };
