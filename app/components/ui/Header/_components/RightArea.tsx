import React from "react";
import ItemGroup from "./ItemGroup";
import WriteButtonGroup from "./WriteButtonGroup";

interface RightAreaProps {}

const RightArea: React.FC<RightAreaProps> = () => {
  return (
    <div className="flex flex-row items-center lg:justify-between xl:col-span-3">
      <WriteButtonGroup />
      <ItemGroup />
    </div>
  );
};

export default RightArea;
