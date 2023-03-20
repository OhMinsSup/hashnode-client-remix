import React from "react";

const EllipsisVertical: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} fill="none" viewBox="0 0 4 16">
      <path
        d="M2 8.834a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667ZM2 14.667A.833.833 0 1 0 2 13a.833.833 0 0 0 0 1.667ZM2 3a.833.833 0 1 0 0-1.666A.833.833 0 0 0 2 3Z"
        stroke="stroke-outline"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default EllipsisVertical;
