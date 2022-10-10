import React from "react";

// components
import { Button } from "~/components/ui/Shared";

// types
import { type ButtonProps } from "~/components/ui/Shared/Button";

interface ActionButtonProps extends ButtonProps {
  icon: React.ReactNode;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  ...props
}) => {
  return (
    <Button {...props}>
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default ActionButton;
