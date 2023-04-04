import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";

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
  CHANGE_DRAFT_ID = "CHANGE_DRAFT_ID",
  CHANGE_TRANSITION = "CHANGE_TRANSITION",
  CHANGE_UPLOAD_STATUS = "CHANGE_UPLOAD_STATUS",
  TOGGLE_LEFT_SIDEBAR = "TOGGLE_LEFT_SIDEBAR",
  SET_FORM_INSTANCE = "SET_FORM_INSTANCE",
}

type ChangeDraftIdAction = {
  type: Action.CHANGE_DRAFT_ID;
  payload: number | undefined;
};

type ChangeTransitionAction = {
  type: Action.CHANGE_TRANSITION;
  payload: Transition;
};

type ToggleLeftSidebarAction = {
  type: Action.TOGGLE_LEFT_SIDEBAR;
  payload: boolean;
};

type SetFormInstanceAction = {
  type: Action.SET_FORM_INSTANCE;
  payload: HTMLFormElement | null;
};

type ChangeUploadStatusAction = {
  type: Action.CHANGE_UPLOAD_STATUS;
  payload: UploadStatus;
};

type ActionType =
  | ChangeDraftIdAction
  | ChangeTransitionAction
  | ToggleLeftSidebarAction
  | SetFormInstanceAction
  | ChangeUploadStatusAction;

interface VisibilityState {
  isLeftSidebarVisible: boolean;
}

interface UploadState {
  status: UploadStatus;
}

interface DraftState {
  visibility: VisibilityState;
  draftId: number | undefined;
  transition: Transition;
  upload: UploadState;
  $form: HTMLFormElement | null;
}

interface DraftContext extends DraftState {
  toggleLeftSidebar: (visible: boolean) => void;
  changeDraftId: (draftId: number | undefined) => void;
  changeTransition: (transition: Transition) => void;
  changeUploadStatus: (status: UploadStatus) => void;
  setFormInstance: (form: HTMLFormElement | null) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: DraftState = {
  $form: null,
  transition: Transition.IDLE,
  visibility: {
    isLeftSidebarVisible: false,
  },
  upload: {
    status: UploadStatus.IDLE,
  },
  draftId: undefined,
};

const [Provider, useDraftContext] = createContext<DraftContext>({
  name: "useDraftContext",
  errorMessage: 'useDraftContext: "context" is undefined.',
  defaultValue: initialState,
});

interface Props {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case Action.CHANGE_DRAFT_ID:
      return {
        ...state,
        draftId: action.payload,
      };
    case Action.CHANGE_TRANSITION:
      return {
        ...state,
        transition: action.payload,
      };
    case Action.TOGGLE_LEFT_SIDEBAR:
      return {
        ...state,
        visibility: {
          ...state.visibility,
          isLeftSidebarVisible: action.payload,
        },
      };
    case Action.SET_FORM_INSTANCE:
      return {
        ...state,
        $form: action.payload,
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

function DraftProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeDraftId = (draftId: number | undefined) => {
    dispatch({
      type: Action.CHANGE_DRAFT_ID,
      payload: draftId,
    });
  };

  const changeTransition = (transition: Transition) => {
    dispatch({
      type: Action.CHANGE_TRANSITION,
      payload: transition,
    });
  };

  const changeUploadStatus = (status: UploadStatus) => {
    dispatch({
      type: Action.CHANGE_UPLOAD_STATUS,
      payload: status,
    });
  };

  const toggleLeftSidebar = (visible: boolean) => {
    dispatch({
      type: Action.TOGGLE_LEFT_SIDEBAR,
      payload: visible,
    });
  };

  const setFormInstance = (form: HTMLFormElement | null) => {
    dispatch({
      type: Action.SET_FORM_INSTANCE,
      payload: form,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      changeDraftId,
      changeTransition,
      changeUploadStatus,
      toggleLeftSidebar,
      setFormInstance,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { DraftProvider, useDraftContext };
