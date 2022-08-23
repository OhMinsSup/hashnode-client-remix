import React from "react";
import { useMedia } from "react-use";

const LeftSidebar = () => {
  const isWide = useMedia("(min-width: 1260px)");
  console.log(isWide);

  return (
    <div
      className="relative z-50 col-span-2 hidden lg:block"
      style={{
        minHeight: isWide ? "710px" : "750px",
      }}
    >
      <div style={{ transform: "translateZ(0px)" }}>LeftSidebar</div>
    </div>
  );
};

export default LeftSidebar;
