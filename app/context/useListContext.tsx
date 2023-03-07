import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";

type ViewType = "CLASSIC" | "MODERN";

enum Action {
  CLOSE_FILTER = "CLOSE_FILTER",
  OPEN_FILTER = "OPEN_FILTER",
  CLOSE_VIEW_TYPE = "CLOSE_VIEW_TYPE",
  OPEN_VIEW_TYPE = "OPEN_VIEW_TYPE",
  CHANGE_VIEW_TYPE = "CHANGE_VIEW_TYPE",
}

type CloseFilterAction = {
  type: Action.CLOSE_FILTER;
};

type OpenFilterAction = {
  type: Action.OPEN_FILTER;
};

type CloseViewTypeAction = {
  type: Action.CLOSE_VIEW_TYPE;
};

type OpenViewTypeAction = {
  type: Action.OPEN_VIEW_TYPE;
};

type ChangeViewTypeAction = {
  type: Action.CHANGE_VIEW_TYPE;
  payload: ViewType;
};

type ActionType =
  | CloseFilterAction
  | OpenFilterAction
  | CloseViewTypeAction
  | OpenViewTypeAction
  | ChangeViewTypeAction;

interface ListState {
  isFilter: boolean;
  isViewType: boolean;
  viewType: ViewType;
}

interface ListContext extends ListState {
  openFilter: () => void;
  closeFilter: () => void;
  openViewType: () => void;
  closeViewType: () => void;
  changeViewType: (viewType: ViewType) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: ListState = {
  isFilter: false,
  isViewType: false,
  viewType: "MODERN",
};

const [Provider, useListContext] = createContext<ListContext>({
  name: "useListContext",
  errorMessage: 'useListContext: "context" is undefined.',
  defaultValue: initialState,
});

interface Props {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case Action.CLOSE_FILTER:
      return {
        ...state,
        isFilter: false,
      };
    case Action.OPEN_FILTER:
      return {
        ...state,
        isFilter: true,
      };
    case Action.CLOSE_VIEW_TYPE:
      return {
        ...state,
        isViewType: false,
      };
    case Action.OPEN_VIEW_TYPE:
      return {
        ...state,
        isViewType: true,
      };
    case Action.CHANGE_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };
    default:
      return state;
  }
}

function ListProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openFilter = () => dispatch({ type: Action.OPEN_FILTER });

  const closeFilter = () => dispatch({ type: Action.CLOSE_FILTER });

  const openViewType = () => dispatch({ type: Action.OPEN_VIEW_TYPE });

  const closeViewType = () => dispatch({ type: Action.CLOSE_VIEW_TYPE });

  const changeViewType = (viewType: ViewType) =>
    dispatch({ type: Action.CHANGE_VIEW_TYPE, payload: viewType });

  const actions = useMemo(
    () => ({
      ...state,
      openFilter,
      closeFilter,
      openViewType,
      closeViewType,
      changeViewType,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { ListProvider, useListContext };
