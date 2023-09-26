import { useMemo, useReducer } from "react";
import { createContext } from "~/libs/react-utils";

enum Action {
  OPEN = "OPEN",
  CLOSE = "CLOSE",

  SET_SIDE_OPEN = "SET_SIDE_OPEN",
  SET_SIDE_CLOSE = "SET_SIDE_CLOSE",
}

type OpenAction = {
  type: Action.OPEN;
};

type CloseAction = {
  type: Action.CLOSE;
};

type SetSideOpenAction = {
  type: Action.SET_SIDE_OPEN;
};

type SetSideCloseAction = {
  type: Action.SET_SIDE_CLOSE;
};

type WriteAction =
  | OpenAction
  | CloseAction
  | SetSideOpenAction
  | SetSideCloseAction;

interface WriteState {
  isOpen: boolean;
  isSideOpen: boolean;
}

interface WriteContext extends WriteState {
  open: () => void;
  close: () => void;
  setSideOpen: () => void;
  setSideClose: () => void;
  dispatch: React.Dispatch<WriteAction>;
}

const initialState: WriteState = {
  isOpen: false,
  isSideOpen: true,
};

const [Provider, useWriteContext] = createContext<WriteContext>({
  name: "useWriteContext",
  errorMessage: "useWriteContext: `context` is undefined.",
  defaultValue: initialState,
});

function reducer(state = initialState, action: WriteAction) {
  switch (action.type) {
    case Action.OPEN: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case Action.CLOSE: {
      return {
        ...state,
        isOpen: false,
      };
    }
    case Action.SET_SIDE_OPEN: {
      return {
        ...state,
        isSideOpen: true,
      };
    }
    case Action.SET_SIDE_CLOSE: {
      return {
        ...state,
        isSideOpen: false,
      };
    }
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

function WriteProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const open = () => dispatch({ type: Action.OPEN });

  const close = () => dispatch({ type: Action.CLOSE });

  const setSideOpen = () => dispatch({ type: Action.SET_SIDE_OPEN });

  const setSideClose = () => dispatch({ type: Action.SET_SIDE_CLOSE });

  const actions = useMemo(
    () => ({
      ...state,
      open,
      close,
      setSideOpen,
      setSideClose,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { WriteProvider, useWriteContext };
