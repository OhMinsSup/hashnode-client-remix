import React from "react";

interface LabelWithTooltipWrapperProps {
  label?: React.ReactNode;
  children: React.ReactNode;
  isOptional?: boolean;
}

export default function LabelWithTooltipWrapper({
  label,
  isOptional,
  children,
}: LabelWithTooltipWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {label ? (
            <div className="flex gap-[0.375rem] items-center">{label}</div>
          ) : null}
          {isOptional && (
            <span className="text-base text-muted-foreground">Optional</span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
