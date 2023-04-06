import React from "react";
import classNames from "classnames";
import type { Argument } from "classnames";

interface ReachedEndProps {
  className?: Argument;
}

const ReachedEnd: React.FC<ReachedEndProps> = ({ className }) => {
  return (
    <div className={classNames("reached-end !m-0 !bg-transparent", className)}>
      <p className="reached-end-text">You've reached the end! 👋</p>
    </div>
  );
};

export default ReachedEnd;
