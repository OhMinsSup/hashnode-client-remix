import React from "react";

interface SettingLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function SettingLayout({
  children,
  sidebar,
}: SettingLayoutProps) {
  return (
    <div className="container mx-auto mt-5">
      <div className="flex flex-row flex-wrap md:pt-2">
        <div className="w-full shrink-0 lg:w-84 lg:pl-0 lg:pr-4">{sidebar}</div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
