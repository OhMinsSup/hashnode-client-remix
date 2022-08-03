import React, { createContext, useContext, useMemo } from "react";
import { createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin";

// types
import type { HistoryState } from "@lexical/react/LexicalHistoryPlugin";

type ContextShape = {
  historyState?: HistoryState;
};

const Context: React.Context<ContextShape> = createContext({});

export const SharedHistoryContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const historyContext = useMemo(
    () => ({ historyState: createEmptyHistoryState() }),
    []
  );
  return <Context.Provider value={historyContext}>{children}</Context.Provider>;
};

export const useSharedHistoryContext = (): ContextShape => {
  return useContext(Context);
};
