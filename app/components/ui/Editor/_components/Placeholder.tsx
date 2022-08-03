import React from "react";

interface PlaceholderProps {
  className?: string;
}

const Placeholder: React.FC<React.PropsWithChildren<PlaceholderProps>> = ({
  className,
  children,
}) => {
  return <div className={className || "Placeholder__root"}>{children}</div>;
};

export default Placeholder;
