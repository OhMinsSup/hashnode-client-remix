import React from "react";

// components
import ItemGroup from "./ItemGroup";
import WriteButtonGroup from "./WriteButtonGroup";

interface RightAreaProps {}

const RightArea: React.FC<RightAreaProps> = () => {
  return (
    <div className="header-right-area">
      <WriteButtonGroup />
      <ItemGroup />
    </div>
  );
};

export default RightArea;
