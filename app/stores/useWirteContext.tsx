import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";
import type EditorJS from "@editorjs/editorjs";

export enum Transition {
  IDLE = "IDLE",
  UPDATING = "UPDATING",
  DONE = "DONE",
}

export enum UploadStatus {
  IDLE = "IDLE",
  UPLOADING = "UPLOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

enum Action {
  SET_EDITORJS = "SET_EDITORJS",
  SET_TRANSITION = "SET_TRANSITION",
  SET_DRAFTS_ID = "SET_DRAFTS_ID",
  TOGGLE_SUBTITLE = "TOGGLE_SUBTITLE",
  TOGGLE_SETTING = "TOGGLE_SETTING",
  CHANGE_UPLOAD_STATUS = "CHANGE_UPLOAD_STATUS",
}

type SetEditorJSAction = {
  type: Action.SET_EDITORJS;
  payload: EditorJS | null;
};

type SetTransitionAction = {
  type: Action.SET_TRANSITION;
  payload: Transition;
};

type SetDraftsIdAction = {
  type: Action.SET_DRAFTS_ID;
  payload: string | number | undefined;
};

type ToggleSubtitleAction = {
  type: Action.TOGGLE_SUBTITLE;
  payload: boolean;
};

type ToggleSettingAction = {
  type: Action.TOGGLE_SETTING;
  payload: boolean;
};

type ChangeUploadStatusAction = {
  type: Action.CHANGE_UPLOAD_STATUS;
  payload: UploadStatus;
};

type ActionType =
  | SetEditorJSAction
  | SetTransitionAction
  | SetDraftsIdAction
  | ToggleSubtitleAction
  | ToggleSettingAction
  | ChangeUploadStatusAction;

interface VisibilityState {
  subTitle: boolean;
  setting: boolean;
}

interface UploadState {
  status: UploadStatus;
}

interface WriteContextState {
  draftId: string | number | undefined;
  editorJS: EditorJS | null;
  transition: Transition;
  visibility: VisibilityState;
  upload: UploadState;
}

interface WriteContext extends WriteContextState {
  setEditorJS: (editorJS: EditorJS | null) => void;
  setTransition: (transition: Transition) => void;
  setDraftsId: (draftId: string | number | undefined) => void;
  toggleSubtitle: (isShow: boolean) => void;
  toggleSetting: (isShow: boolean) => void;
  changeUploadStatus: (status: UploadStatus) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: WriteContextState = {
  draftId: undefined,
  editorJS: null,
  transition: Transition.IDLE,
  visibility: {
    subTitle: false,
    setting: false,
  },
  upload: {
    status: UploadStatus.IDLE,
  },
};

const [Provider, useWriteContext] = createContext<WriteContext>({
  name: "useWriteContext",
  errorMessage: "useWriteContext: `context` is undefined.",
  defaultValue: initialState,
});

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
    case Action.SET_DRAFTS_ID:
      return {
        ...state,
        draftId: action.payload,
      };
    case Action.TOGGLE_SUBTITLE:
      return {
        ...state,
        visibility: {
          ...state.visibility,
          subTitle: action.payload,
        },
      };
    case Action.TOGGLE_SETTING:
      return {
        ...state,
        visibility: {
          ...state.visibility,
          setting: action.payload,
        },
      };
    case Action.CHANGE_UPLOAD_STATUS:
      return {
        ...state,
        upload: {
          ...state.upload,
          status: action.payload,
        },
      };
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

function WriteProvider({ children }: Props) {
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

  const setDraftsId = (draftId: string | number | undefined) => {
    dispatch({
      type: Action.SET_DRAFTS_ID,
      payload: draftId,
    });
  };

  const toggleSubtitle = (isShow: boolean) => {
    dispatch({
      type: Action.TOGGLE_SUBTITLE,
      payload: isShow,
    });
  };

  const toggleSetting = (isShow: boolean) => {
    dispatch({
      type: Action.TOGGLE_SETTING,
      payload: isShow,
    });
  };

  const changeUploadStatus = (status: UploadStatus) => {
    dispatch({
      type: Action.CHANGE_UPLOAD_STATUS,
      payload: status,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setTransition,
      setEditorJS,
      setDraftsId,
      toggleSubtitle,
      toggleSetting,
      changeUploadStatus,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { WriteProvider, useWriteContext };
