import { useMemo, useReducer } from "react";
import { createContext } from "~/libs/react-utils";

enum Action {
  INITIALIZE = "INITIALIZE",
  CHANGE_DIALOG_STATE = "CHANGE_DIALOG_STATE",
  CHANGE_INPUT = "CHANGE_INPUT",
}

type InitializeAction = {
  type: Action.INITIALIZE;
};

type ChangeDialogStateAction = {
  type: Action.CHANGE_DIALOG_STATE;
  payload: {
    isOpen: boolean;
  };
};

type ChangeInputAction = {
  type: Action.CHANGE_INPUT;
  payload: string;
};

type SearchDialogAction =
  | InitializeAction
  | ChangeDialogStateAction
  | ChangeInputAction;

interface DialogState {
  isOpen: boolean;
}

interface SearchDialogState {
  input: string;
  dialog: DialogState;
}

interface SearchDialogContext extends SearchDialogState {
  initialize: () => void;
  changeDialogState: (payload: ChangeDialogStateAction["payload"]) => void;
  changeInput: (payload: ChangeInputAction["payload"]) => void;
  dispatch: React.Dispatch<SearchDialogAction>;
}

const initialState: SearchDialogState = {
  input: "",
  dialog: {
    isOpen: false,
  },
};

const [Provider, useSearchDialogContext] = createContext<SearchDialogContext>({
  name: "useSearchDialogContext",
  errorMessage: "useSearchDialogContext: `context` is undefined.",
  defaultValue: initialState,
});

function reducer(state = initialState, action: SearchDialogAction) {
  switch (action.type) {
    case Action.INITIALIZE: {
      return initialState;
    }
    case Action.CHANGE_DIALOG_STATE: {
      return {
        ...state,
        dialog: {
          ...state.dialog,
          ...action.payload,
        },
      };
    }
    case Action.CHANGE_INPUT: {
      return {
        ...state,
        input: action.payload,
      };
    }
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

function SearchDialogProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = () => dispatch({ type: Action.INITIALIZE });

  const changeDialogState = (payload: ChangeDialogStateAction["payload"]) =>
    dispatch({ type: Action.CHANGE_DIALOG_STATE, payload });

  const changeInput = (payload: ChangeInputAction["payload"]) =>
    dispatch({ type: Action.CHANGE_INPUT, payload });

  const actions = useMemo(
    () => ({
      ...state,
      initialize,
      changeDialogState,
      changeInput,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { SearchDialogProvider, useSearchDialogContext };
