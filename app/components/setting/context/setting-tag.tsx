import { useMemo, useReducer } from "react";
import { createContext } from "~/libs/react-utils";
import { TaskQueue } from "./task-queue";

enum Action {
  UPSERT_TAG = "UPSERT_TAG",
  UPSERT_TAGS = "UPSERT_TAGS",
  REMOVE_TAG = "REMOVE_TAG",
  RESET_INPUT = "RESET_INPUT",
  CHANGE_INPUT = "CHANGE_INPUT",
}

type UpsertTagAction = {
  type: Action.UPSERT_TAG;
  payload: string;
};

type UpsertTagsAction = {
  type: Action.UPSERT_TAGS;
  payload: string[];
};

type RemoveTagAction = {
  type: Action.REMOVE_TAG;
  payload: string;
};

type ChangeInputAction = {
  type: Action.CHANGE_INPUT;
  payload: string;
};

type ResetInputAction = {
  type: Action.RESET_INPUT;
};

type SettingTagsAction =
  | UpsertTagAction
  | ChangeInputAction
  | UpsertTagsAction
  | RemoveTagAction
  | ResetInputAction;

interface SettingTagsState {
  reset: Symbol;
  inputValue: string;
  tags: Set<string>;
  open: boolean;
  taskQueue: TaskQueue;
}

interface SettingTagsContext extends SettingTagsState {
  upsertTag: (payload: UpsertTagAction["payload"]) => void;
  upsertTags: (payload: UpsertTagsAction["payload"]) => void;
  removeTag: (payload: RemoveTagAction["payload"]) => void;
  changeInput: (payload: ChangeInputAction["payload"]) => void;
  resetInput: () => void;
  dispatch: React.Dispatch<SettingTagsAction>;
}

const initialState: SettingTagsState = {
  reset: Symbol("resetInput"),
  inputValue: "",
  tags: new Set<string>(),
  open: false,
  taskQueue: new TaskQueue(),
};

const [Provider, useSettingTagsContext] = createContext<SettingTagsContext>({
  name: "useSettingTagsContext",
  errorMessage: "useSettingTagsContext: `context` is undefined.",
  defaultValue: initialState,
});

function reducer(state = initialState, action: SettingTagsAction) {
  switch (action.type) {
    case Action.UPSERT_TAG: {
      const { payload } = action;
      const tags = new Set(state.tags);
      if (!tags.has(payload)) tags.add(payload);
      return { ...state, tags };
    }
    case Action.UPSERT_TAGS: {
      const { payload } = action;
      const tags = new Set(state.tags);
      for (const tag of payload) {
        if (tags.has(tag)) continue;
        tags.add(tag);
      }
      return { ...state, tags };
    }
    case Action.REMOVE_TAG: {
      const { payload } = action;
      const tags = new Set(state.tags);
      tags.delete(payload);
      return { ...state, tags };
    }
    case Action.CHANGE_INPUT: {
      const { payload } = action;
      return { ...state, inputValue: payload };
    }
    case Action.RESET_INPUT: {
      return { ...state, reset: Symbol("resetInput") };
    }
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
  initialValue?: string[];
}

function SettingTagsProvider({ children, initialValue }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    initialValue
      ? { ...initialState, tags: new Set(initialValue) }
      : initialState
  );

  const upsertTag = (payload: UpsertTagAction["payload"]) => {
    dispatch({ type: Action.UPSERT_TAG, payload });
  };

  const upsertTags = (payload: UpsertTagsAction["payload"]) => {
    dispatch({ type: Action.UPSERT_TAGS, payload });
  };

  const removeTag = (payload: RemoveTagAction["payload"]) => {
    dispatch({ type: Action.REMOVE_TAG, payload });
  };

  const changeInput = (payload: ChangeInputAction["payload"]) => {
    dispatch({ type: Action.CHANGE_INPUT, payload });
  };

  const resetInput = () => {
    dispatch({ type: Action.RESET_INPUT });
  };

  const actions = useMemo(
    () => ({
      ...state,
      upsertTag,
      upsertTags,
      removeTag,
      changeInput,
      resetInput,
      dispatch,
    }),
    [state]
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { SettingTagsProvider, useSettingTagsContext };
