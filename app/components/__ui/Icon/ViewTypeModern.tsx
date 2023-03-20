import React from "react";

const ViewTypeModern: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} viewBox="0 0 55 55" fill="none">
      <path
        d="M2 2h51v21H2V2zm0 30h51v21H2V32z"
        stroke="stroke-current"
        strokeWidth={4}
      ></path>
    </svg>
  );
};

export default ViewTypeModern;
