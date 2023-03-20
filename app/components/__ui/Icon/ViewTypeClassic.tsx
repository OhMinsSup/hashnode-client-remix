import React from "react";

const ViewTypeClassic: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} viewBox="0 0 55 55" fill="none">
      <path
        d="M2 2h51v11H2V2zm0 40h51v11H2V42zm0-20h51v11H2V22z"
        stroke="stoke-current"
        strokeWidth={4}
      ></path>
    </svg>
  );
};

export default ViewTypeClassic;
