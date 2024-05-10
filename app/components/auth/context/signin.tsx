import { useMemo, useReducer } from 'react';

import { createContext } from '~/libs/react-utils';

enum Action {
  CHANGE_STEP = 'CHANGE_STEP',
  CHANGE_EMAIL = 'CHANGE_EMAIL',
}

type ChangeStepAction = {
  type: Action.CHANGE_STEP;
  payload: number;
};

type ChangeEmailAction = {
  type: Action.CHANGE_EMAIL;
  payload: string;
};

type SigninAction = ChangeStepAction | ChangeEmailAction;

interface SigninState {
  step: number;
  email: string;
}

interface SigninContext extends SigninState {
  changeStep: (payload: ChangeStepAction['payload']) => void;
  changeEmail: (payload: ChangeEmailAction['payload']) => void;
  dispatch: React.Dispatch<SigninAction>;
}

const initialState: SigninState = {
  step: 1,
  email: '',
};

const [Provider, useSigninContext] = createContext<SigninContext>({
  name: 'useSigninContext',
  errorMessage: 'useSigninContext: `context` is undefined.',
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
    case Action.CHANGE_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

function SigninProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeStep = (payload: ChangeStepAction['payload']) => {
    dispatch({ type: Action.CHANGE_STEP, payload });
  };

  const changeEmail = (payload: ChangeEmailAction['payload']) => {
    dispatch({ type: Action.CHANGE_EMAIL, payload });
  };

  const actions = useMemo(
    () => ({
      ...state,
      changeStep,
      changeEmail,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { SigninProvider, useSigninContext };
