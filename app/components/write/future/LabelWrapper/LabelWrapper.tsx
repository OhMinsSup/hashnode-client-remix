import React from 'react';

interface LabelWrapperProps {
  label?: React.ReactNode;
  children: React.ReactNode;
}

export default function LabelWrapper({ label, children }: LabelWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <div className="flex flex-row items-center gap-[0.375rem]">{label}</div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
