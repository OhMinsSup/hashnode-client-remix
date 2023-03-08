import React, { useReducer, useMemo } from "react";
import { createContext } from "~/libs/react-utils";

export enum Transition {
  IDLE = "IDLE",
  UPDATING = "UPDATING",
  DONE = "DONE",
}

enum Action {
  CHANGE_DRAFT_ID = "CHANGE_DRAFT_ID",
  CHANGE_TRANSITION = "CHANGE_TRANSITION",
}

type ChangeDraftIdAction = {
  type: Action.CHANGE_DRAFT_ID;
  payload: number | undefined;
};

type ChangeTransitionAction = {
  type: Action.CHANGE_TRANSITION;
  payload: Transition;
};

type ActionType = ChangeDraftIdAction | ChangeTransitionAction;

interface DraftState {
  draftId: number | undefined;
  transition: Transition;
}

interface DraftContext extends DraftState {
  changeDraftId: (draftId: number | undefined) => void;
  changeTransition: (transition: Transition) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: DraftState = {
  draftId: undefined,
  transition: Transition.IDLE,
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

  const actions = useMemo(
    () => ({
      ...state,
      changeDraftId,
      changeTransition,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { DraftProvider, useDraftContext };
