import { useMemo, useReducer } from "react";
import { createContext } from "~/libs/react-utils";

enum Action {
  OPEN = "OPEN",
  CLOSE = "CLOSE",

  SET_SIDE_OPEN = "SET_SIDE_OPEN",
  SET_SIDE_CLOSE = "SET_SIDE_CLOSE",

  SET_SUBTITLE_OPEN = "SET_SUBTITLE_OPEN",
  SET_SUBTITLE_CLOSE = "SET_SUBTITLE_CLOSE",

  SET_COVER_OPEN = "SET_COVER_OPEN",
  SET_COVER_CLOSE = "SET_COVER_CLOSE",

  SET_UPLOAD_STATE = "SET_UPLOAD_STATE",

  CHANGE_LEFT_SIDE_KEYWORD = "CHANGE_LEFT_SIDE_KEYWORD",
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

type SetSubtitleOpenAction = {
  type: Action.SET_SUBTITLE_OPEN;
};

type SetSubtitleCloseAction = {
  type: Action.SET_SUBTITLE_CLOSE;
};

type SetCoverOpenAction = {
  type: Action.SET_COVER_OPEN;
};

type SetCoverCloseAction = {
  type: Action.SET_COVER_CLOSE;
};

type SetUploadStateAction = {
  type: Action.SET_UPLOAD_STATE;
  payload: "idle" | "pending" | "success" | "error";
};

type ChangeLeftSideKeywordAction = {
  type: Action.CHANGE_LEFT_SIDE_KEYWORD;
  payload: string;
};

type WriteAction =
  | OpenAction
  | CloseAction
  | SetSideOpenAction
  | SetSideCloseAction
  | SetSubtitleOpenAction
  | SetSubtitleCloseAction
  | SetCoverOpenAction
  | SetCoverCloseAction
  | SetUploadStateAction
  | ChangeLeftSideKeywordAction;

interface WriteState {
  isOpen: boolean;
  isSideOpen: boolean;
  isSubtitleOpen: boolean;
  isCoverOpen: boolean;
  uploadState: "idle" | "pending" | "success" | "error";
  leftSideKeyword: string;
}

interface WriteContext extends WriteState {
  open: () => void;
  close: () => void;
  setSideOpen: () => void;
  setSideClose: () => void;
  setSubtitleOpen: () => void;
  setSubtitleClose: () => void;
  setCoverOpen: () => void;
  setCoverClose: () => void;
  setUploadState: (payload: SetUploadStateAction["payload"]) => void;
  changeLeftSideKeyword: (
    payload: ChangeLeftSideKeywordAction["payload"]
  ) => void;
  dispatch: React.Dispatch<WriteAction>;
}

const initialState: WriteState = {
  isOpen: false,
  isSideOpen: true,
  isSubtitleOpen: false,
  isCoverOpen: false,
  uploadState: "idle",
  leftSideKeyword: "",
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
    case Action.SET_SUBTITLE_OPEN: {
      return {
        ...state,
        isSubtitleOpen: true,
      };
    }
    case Action.SET_SUBTITLE_CLOSE: {
      return {
        ...state,
        isSubtitleOpen: false,
      };
    }
    case Action.SET_COVER_OPEN: {
      return {
        ...state,
        isCoverOpen: true,
      };
    }
    case Action.SET_COVER_CLOSE: {
      return {
        ...state,
        isCoverOpen: false,
      };
    }
    case Action.SET_UPLOAD_STATE: {
      return {
        ...state,
        uploadState: action.payload,
      };
    }
    case Action.CHANGE_LEFT_SIDE_KEYWORD: {
      return {
        ...state,
        leftSideKeyword: action.payload,
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

  const setSubtitleOpen = () => dispatch({ type: Action.SET_SUBTITLE_OPEN });

  const setSubtitleClose = () => dispatch({ type: Action.SET_SUBTITLE_CLOSE });

  const setCoverOpen = () => dispatch({ type: Action.SET_COVER_OPEN });

  const setCoverClose = () => dispatch({ type: Action.SET_COVER_CLOSE });

  const setUploadState = (payload: SetUploadStateAction["payload"]) =>
    dispatch({ type: Action.SET_UPLOAD_STATE, payload });

  const changeLeftSideKeyword = (
    payload: ChangeLeftSideKeywordAction["payload"]
  ) => dispatch({ type: Action.CHANGE_LEFT_SIDE_KEYWORD, payload });

  const actions = useMemo(
    () => ({
      ...state,
      open,
      close,
      setSideOpen,
      setSideClose,
      setSubtitleOpen,
      setSubtitleClose,
      setCoverOpen,
      setCoverClose,
      setUploadState,
      changeLeftSideKeyword,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { WriteProvider, useWriteContext };
