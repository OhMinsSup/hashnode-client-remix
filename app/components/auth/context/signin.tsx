import { useMemo, useReducer } from "react";
import { createContext } from "~/libs/react-utils";

enum Action {
  CHANGE_STEP = "CHANGE_STEP",
}

type ChangeStepAction = {
  type: Action.CHANGE_STEP;
  payload: number;
};

type SigninAction = ChangeStepAction;

interface SigninState {
  step: number;
}

interface SigninContext extends SigninState {
  changeStep: (payload: ChangeStepAction["payload"]) => void;
  dispatch: React.Dispatch<SigninAction>;
}

const initialState: SigninState = {
  step: 1,
};

const [Provider, useSigninContext] = createContext<SigninContext>({
  name: "useSigninContext",
  errorMessage: "useSigninContext: `context` is undefined.",
  defaultValue: initialState,
});

function reducer(state = initialState, action: SigninAction) {
  switch (action.type) {
    case Action.CHANGE_STEP: {
      return {
        ...state,
        step: action.payload,
      };
    }
    default:
      return state;
  }
}

interface Props {
  isStep3?: boolean;
  children: React.ReactNode;
}

function SigninProvider({ children, isStep3 }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    isStep3 ? { ...initialState, step: 3 } : initialState
  );

  const changeStep = (payload: ChangeStepAction["payload"]) => {
    dispatch({ type: Action.CHANGE_STEP, payload });
  };

  const actions = useMemo(
    () => ({
      ...state,
      changeStep,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { SigninProvider, useSigninContext };
