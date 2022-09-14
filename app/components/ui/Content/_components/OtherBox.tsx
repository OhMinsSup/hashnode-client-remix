import React from "react";
import RightContentBox from "./RightContentBox";

interface OtherBoxProps {}

const OtherBox: React.FC<OtherBoxProps> = () => {
  return (
    <RightContentBox title="Others">
      <div className="flex flex-row flex-wrap text-sm font-medium text-gray-700">
        OtherBox
      </div>
    </RightContentBox>
  );
};

export default OtherBox;
