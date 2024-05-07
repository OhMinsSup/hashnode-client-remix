import React from "react";
import { Label } from "~/components/ui/label";

interface LabelWithDescriptionProps {
  text: string;
  help: React.ReactNode;
  children: React.ReactNode;
}

export default function LabelWithDescription({
  text,
  help,
  children,
}: LabelWithDescriptionProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label className="text-xl font-semibold">{text}</Label>
        <p className="text-base text-muted-foreground">{help}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
