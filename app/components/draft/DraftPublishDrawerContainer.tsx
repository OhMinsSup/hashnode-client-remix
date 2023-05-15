import React from "react";

interface DraftPublishDrawerContainerProps {
  children: React.JSX.Element;
}

export default function DraftPublishDrawerContainer({
  children,
}: DraftPublishDrawerContainerProps) {
  return <div className="px-5 pb-5 pt-4">{children}</div>;
}
