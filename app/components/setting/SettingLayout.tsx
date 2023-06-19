import React from "react";
import SettingHeader from "./SettingHeader";
import SettingSidebar from "./SettingSidebar";

interface SettingLayoutProps {
  children: React.JSX.Element;
}

export default function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <div className="bg-slate-100">
      <SettingHeader />
      <div className="setting__container">
        <div className="wrapper">
          <SettingSidebar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
