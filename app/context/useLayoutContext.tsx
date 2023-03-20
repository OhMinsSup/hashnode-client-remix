import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";

enum Action {
  CHNAGE_SEARCH_KEYWORD = "CHNAGE_SEARCH_KEYWORD",
}

type ChangeSearchKeywordPayload = {
  type: Action.CHNAGE_SEARCH_KEYWORD;
  payload: {
    keyword: string;
  };
};

type ActionType = ChangeSearchKeywordPayload;

interface SearchState {
  keyword: string;
}

interface LayoutContextState {
  search: SearchState;
}

interface LayoutContext extends LayoutContextState {
  changeSearchKeyword: (payload: ChangeSearchKeywordPayload["payload"]) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: LayoutContextState = {
  search: {
    keyword: "",
  },
};

const [Provider, useLayoutContext] = createContext<LayoutContext>({
  name: "useLayoutContext",
  errorMessage: "useLayoutContext: `context` is undefined.",
  defaultValue: initialState,
});

function reducer(state = initialState, action: ActionType): LayoutContextState {
  switch (action.type) {
    case Action.CHNAGE_SEARCH_KEYWORD: {
      const { keyword } = action.payload;
      return {
        ...state,
        search: {
          ...state.search,
          keyword,
        },
      };
    }
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

function LayoutProvider({ children, ...otherProps }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    Object.assign({}, initialState, otherProps)
  );

  const changeSearchKeyword = (
    payload: ChangeSearchKeywordPayload["payload"]
  ) => {
    dispatch({
      type: Action.CHNAGE_SEARCH_KEYWORD,
      payload,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      changeSearchKeyword,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { LayoutProvider, useLayoutContext };
