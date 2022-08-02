import React from "react";
import InternalEditor from "./_components/InternalEditor";
import { SettingsProvider } from "./_context/setting";

const Editor = () => {
  return (
    <SettingsProvider>
      <InternalEditor />
    </SettingsProvider>
  );
};

export default Editor;
