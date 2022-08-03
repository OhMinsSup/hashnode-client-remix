import React from "react";
import InternalEditor from "./_components/InternalEditor";
import { SharedHistoryContext } from "./_context/history";
import { SettingsProvider } from "./_context/setting";

const Editor = () => {
  return (
    <SettingsProvider>
      <SharedHistoryContext>
        <InternalEditor />
      </SharedHistoryContext>
    </SettingsProvider>
  );
};

export default Editor;
