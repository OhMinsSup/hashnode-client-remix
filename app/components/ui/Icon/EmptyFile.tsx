import React from "react";

const EmptyFile: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} fill="none" viewBox="0 0 18 18">
      <path
        d="M10.5 1.875V4.2c0 .63 0 .945.123 1.186.107.211.28.384.491.491C11.354 6 11.67 6 12.3 6h2.325M6.75 9h4.5m-4.5 3h3M15 6.244V12.9c0 1.26 0 1.89-.245 2.371-.216.424-.56.768-.984.984-.48.245-1.11.245-2.371.245H6.6c-1.26 0-1.89 0-2.371-.245a2.25 2.25 0 0 1-.984-.983C3 14.79 3 14.16 3 12.9V5.1c0-1.26 0-1.89.245-2.371a2.25 2.25 0 0 1 .984-.984C4.709 1.5 5.339 1.5 6.6 1.5h3.656c.367 0 .55 0 .723.041.153.037.3.098.433.18.152.093.281.223.54.482l2.345 2.344c.26.26.39.39.482.54.082.135.143.281.18.434.041.173.041.356.041.723Z"
        stroke="stroke-current"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default EmptyFile;
