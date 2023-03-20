import React from "react";

const Unsplash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} viewBox="20 21 96 96">
      <g fillRule="evenodd">
        <path d="M50 21h36v27H50zM20 63h30.087v27.24h36.079V63H116v54H20z"></path>
      </g>
    </svg>
  );
};

export default Unsplash;
