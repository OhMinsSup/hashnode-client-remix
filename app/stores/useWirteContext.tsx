import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";
import type EditorJS from "@editorjs/editorjs";

export enum Transition {
  IDLE = "IDLE",
  UPDATING = "UPDATING",
  DONE = "DONE",
}

enum Action {
  SET_EDITORJS = "SET_EDITORJS",
  SET_TRANSITION = "SET_TRANSITION",
}

type SetEditorJSAction = {
  type: Action.SET_EDITORJS;
  payload: EditorJS | null;
};

type SetTransitionAction = {
  type: Action.SET_TRANSITION;
  payload: Transition;
};

type ActionType = SetEditorJSAction | SetTransitionAction;

interface WriteContextState {
  editorJS: EditorJS | null;
  transition: Transition;
}

interface WriteContext extends WriteContextState {
  setEditorJS: (editorJS: EditorJS | null) => void;
  setTransition: (transition: Transition) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: WriteContextState = {
  editorJS: null,
  transition: Transition.IDLE,
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
    case Action.SET_TRANSITION:
      return {
        ...state,
        transition: action.payload,
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

  const setTransition = (transition: Transition) => {
    dispatch({
      type: Action.SET_TRANSITION,
      payload: transition,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setTransition,
      setEditorJS,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { WriteContextProvider, useWriteContext };
