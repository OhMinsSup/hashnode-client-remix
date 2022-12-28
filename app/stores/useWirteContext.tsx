import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";
import type EditorJS from "@editorjs/editorjs";

enum Action {
  SET_EDITORJS = "SET_EDITORJS",
}

type SetEditorJSAction = {
  type: Action.SET_EDITORJS;
  payload: EditorJS | null;
};

type ActionType = SetEditorJSAction;

interface WriteContextState {
  editorJS: EditorJS | null;
}

interface WriteContext extends WriteContextState {
  setEditorJS: (editorJS: EditorJS | null) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: WriteContextState = {
  editorJS: null,
};

const [Provider, useWriteContext] = createContext<WriteContext>({
  name: "useWriteContext",
  errorMessage: "useWriteContext: `context` is undefined.",
  defaultValue: initialState,
});

interface ScreeningProps {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType): WriteContextState {
  switch (action.type) {
    case Action.SET_EDITORJS:
      return {
        ...state,
        editorJS: action.payload,
      };
    default:
      return state;
  }
}

function WriteContextProvider({ children }: ScreeningProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEditorJS = (editorJS: EditorJS | null) => {
    dispatch({
      type: Action.SET_EDITORJS,
      payload: editorJS,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setEditorJS,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { WriteContextProvider, useWriteContext };
